import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Column } from '@vtb/ui-kit3';    
import axios, { Canceler, CancelToken } from 'axios';
import { assertDefined, isDefined } from '~/helpers/guards';
import { useApi } from '~/shared/ApiContext';
import { defaultPageNumber, defaultPageSize, pageSizes } from './constants';
import type { DataDto, FilterDto, ListDto, QueryRequest, СolumnInfoDto } from '~/shared/models';
import { TableContainer, EmptyWrapper,  PaginationStyled} from './styled';
import { TableHeader } from './TableHeader'
import { TableRows } from './TableRows'
import * as S from './styled';
import { formValuesToRequestParams } from '../Filters/hooks/useRequestParams';
import { Filters } from '../Filters';


type PropType = {
    columns: Column[];
    filters: FilterDto[];
    book:string;
    lists:Array<ListDto>;
    displayRowSelectionColumn?:boolean;
};

export const Table: React.FC<PropType> = ({columns, filters, lists, book, displayRowSelectionColumn = false}) => {
    const { sourceBookApi } = useApi();
    const [sort, setSort] = useState('bic_code');
    const [asc, setAsc] = useState(true);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [page, setPage] = useState(defaultPageNumber);
    const wasUnmount = useRef(false);
    const [totalItems, setTotalItems] = useState(0);     
    const [rows, setRows] = useState<DataDto[]>([]);
    const [observableUpdate, forceUpdate] = useState({});
    const scrollBodyRef = React.useRef<HTMLDivElement>(null);
    const tableRef = React.useRef<HTMLDivElement>(null);
    const headerRef = React.useRef<HTMLDivElement>(null);

    const sourceBookContext = useMemo(() => {
        return { observableUpdate, forceUpdate };
    }, [observableUpdate]);


    const requestRowsParams = { name: book, take: pageSize, skip: (page - 1) * pageSize + 1 , sortColumn:sort, asc: asc, 
                                    filter: formValuesToRequestParams(filters, lists) };
    

    /**
     * Плагиация
     */
    const handlerPaginationChange = useCallback(
        (values) => {
            setPage(values.pageSize === pageSize ? values.page : 1);
            setPageSize(values.pageSize);
        },
        [pageSize]
    );

    /**
     * Сбрасываем плагиацию
     */
    useEffect(() => {
        setPage(defaultPageNumber);
        setPageSize(defaultPageSize);
    }, [observableUpdate, location.search]);

    /**
     * Получаем столбцы
     */
    const getRows = useCallback(
        (cancelToken: CancelToken) => {
            sourceBookApi
                .getBookRows(requestRowsParams, { cancelToken })
                .then(({ data }) => {
                    if (wasUnmount.current)
                        return;     
                    isDefined(data); 
                    setRows(data);

                })
                .catch((err) => {
                    if (!(err instanceof axios.Cancel)) {
                        console.error('sourceBookApi.getBookRows error', err);
                    }
                });
        },
        [sourceBookApi, requestRowsParams]
    );

    
  const setShadow = (scrollLeft: number) => {
    if (tableRef.current) {
      const initial = tableRef.current.getAttribute('data-shadow');
      if (scrollLeft === 0) {
        if (initial !== 'false') tableRef.current.setAttribute('data-shadow', 'false');
      } else {
        if (initial !== 'true') tableRef.current.setAttribute('data-shadow', 'true');
      }
    }
  };

    const scrollHeader = (scrollLeft: number) => {
        if (headerRef.current) headerRef.current.scrollLeft = scrollLeft;
      };
    
    const handleScroll = (e: any) => {
        if (e.target === scrollBodyRef.current) {
          requestAnimationFrame(function () {
            scrollHeader(e.target.scrollLeft);
          });
        }
        if (displayRowSelectionColumn) {
          requestAnimationFrame(function () {
            setShadow(e.target.scrollLeft);
          });
        }
      };

    React.useLayoutEffect(() => {
        const scrollBody = scrollBodyRef.current;
        if (scrollBody) {
          scrollBody.addEventListener('scroll', handleScroll);
          return () => scrollBody.removeEventListener('scroll', handleScroll);
        }
      }, [scrollBodyRef.current]);
      
    /**
     * Получаем количество строк
     */
    const getCountRows = useCallback(
        (cancelToken: CancelToken) => {
            sourceBookApi
                .getBookCountRows({ name: requestRowsParams.name, 
                                    filter: requestRowsParams.filter
                                  }, { cancelToken })
                .then(({ data }) => {
                    if (wasUnmount.current)
                        return;     
                    isDefined(data); 
                    setTotalItems(data);

                })
                .catch((err) => {
                    if (!(err instanceof axios.Cancel)) {
                        console.error('sourceBookApi.getBookCountRows error', err);
                    }
                });
        },
        [sourceBookApi, requestRowsParams]
    );
    
     const refreshIntervalTime = 10000;
//   /**
//    * Автообновление
//    */
//   useEffect(() => {
//       let cancelInterval: Canceler;
//       wasUnmount.current = false;
//       const intervalId = setInterval(() => {
//           const cancelToken = new axios.CancelToken(function executor(c) {
//               cancelInterval = c;
//           });
//           getRows(cancelToken);
//       }, refreshIntervalTime);
//       return () => {
//           cancelInterval?.();
//           clearInterval(intervalId);
//           wasUnmount.current = true;
//       };
//   }, [refreshIntervalTime]);

    useEffect(() => {
        let cancel: Canceler;
        const cancelToken = new axios.CancelToken(function executor(c) {
            cancel = c;
        });

        wasUnmount.current = false;
        getRows(cancelToken);
        return () => {
            cancel?.();
            wasUnmount.current = true;
        };
    }, [page, pageSize, sort, asc, observableUpdate, location.search]);

    useEffect(() => {
        let cancel: Canceler;
        const cancelToken = new axios.CancelToken(function executor(c) {
            cancel = c;
        });

        wasUnmount.current = false;
        getCountRows(cancelToken);
        return () => {
            cancel?.();
            wasUnmount.current = true;
        };
    }, [location.search, observableUpdate]);
    
   /**
    * Сортировка в колонках
    */
    const handlerSortChange = useCallback(
        (values) => {
            if (values.sort !== 'initial')
            {
                setSort(values.name);
                setAsc(values.sort === 'asc');
            }
            
        },
        [sort]
    );

    /**Взято из компонента */
    const getScrollbarSize = () => {
        let scrollBarWidth = 0;
        const scrollbox = document.createElement('div');
        scrollbox.innerHTML = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diem 
          nonummy nibh euismod tincidunt ut lacreet dolore magna aliguam erat volutpat. 
          Ut wisis enim ad minim veniam, quis nostrud exerci tution ullamcorper suscipit 
          lobortis nisl ut aliquip ex ea commodo consequat.`;
        scrollbox.style.overflow = 'scroll';
        scrollbox.style.fontSize = '14px';
        scrollbox.style.height = '50px';
        scrollbox.style.maxHeight = '50px';
        scrollbox.style.width = '100px';
        scrollbox.style.position = 'absolute';
        scrollbox.style.top = '-100000px';
        scrollbox.style.left = '-100000px';
        document.body.appendChild(scrollbox);
        scrollBarWidth = scrollbox.offsetWidth - scrollbox.clientWidth;
        document.body.removeChild(scrollbox);
        return scrollBarWidth || 16;
      };

    return <>
                <Filters book={requestRowsParams.name} filters={filters} lists={lists} totalCount={totalItems}/>
                {columns.length ? (
                    <>
                    <TableContainer data-dimension='s'>
                        <S.HeaderWrapper scrollbar={getScrollbarSize()}>
                            <S.Header data-dimension={'s'} ref={headerRef} className="tr" data-underline={true}>
                                <TableHeader columns={columns} onSortChange={handlerSortChange} displayRowSelectionColumn={displayRowSelectionColumn}
                                                dimension={'s'}/>
                            </S.Header>
                        </S.HeaderWrapper>
                        {rows.length ? 
                            (<S.ScrollTableBody ref={scrollBodyRef} className="tbody">
                                <TableRows  displayRowSelectionColumn={displayRowSelectionColumn}  columns={columns}
                                            rows = {rows} />
                            </S.ScrollTableBody>) 
                            : (<EmptyWrapper>Нет данных</EmptyWrapper>)
                        }
                        
                    </TableContainer>
                    {!!rows?.length && totalItems > defaultPageSize && (
                        <PaginationStyled
                            onChange={handlerPaginationChange}
                            page={page}
                            pageSize={pageSize}
                            pageSizes={pageSizes}
                            totalItems={totalItems}
                        />
                    )}
                    </>
                    )
                    : (
                        <EmptyWrapper>Нет данных по справочнику</EmptyWrapper>
                    )
                }
            </>;
};
