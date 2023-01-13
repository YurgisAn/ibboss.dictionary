import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Column } from '@vtb/ui-kit3';    
import axios, { Canceler, CancelToken } from 'axios';
import { assertDefined, isDefined } from '~/helpers/guards';
import { useApi } from '~/shared/ApiContext';
import { defaultPageNumber, defaultPageSize, pageSizes } from './constants';
import type { DataDto, СolumnInfoDto } from '~/shared/models';
import { TableContainer, EmptyWrapper,  PaginationStyled} from './styled';
import { TableHeader } from './TableHeader'
import { TableRows } from './TableRows'
import * as S from './styled';
import { formValuesToRequestParams } from '../Filters/hooks/useRequestParams';


type PropType = {
    columns: СolumnInfoDto[];
    book:string;
};

export const Table: React.FC<PropType> = ({columns, book}) => {
    const { sourceBookApi } = useApi();
    const [sort, setSort] = useState('bic_code');
    const [asc, setAsc] = useState(true);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [page, setPage] = useState(defaultPageNumber);
    const wasUnmount = useRef(false);
    const [totalItems, setTotalItems] = useState(100);     
    const [rows, setRows] = useState<DataDto[]>([]);
    const [observableUpdate, forceUpdate] = useState({});
    const sourceBookContext = useMemo(() => {
        return { observableUpdate, forceUpdate };
    }, [observableUpdate]);


    const requestRowsParams = { name: book, take: pageSize, skip: (page - 1) * pageSize + 1 , sortColumn:sort, asc: asc, 
                                    filter: formValuesToRequestParams() };

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
    }, [page, pageSize, sort, asc, observableUpdate]);

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

    return columns.length ? (<TableContainer data-dimension='s'>
                                <TableHeader columns={columns} onSortChange={handlerSortChange}/>
                                <TableRows columns={columns.map((col, index) => (
                                                {
                                                    name: col.value,
                                                    title: col.title,
                                                    width: (100/columns.length)+'%',
                                                    cellAlign: 'left',
                                                    sortable: isDefined(col.sortBy),
                                                } as Column))} 
                                                rows = {rows} />
                                {!!rows?.length && totalItems > defaultPageSize && (
                                    <PaginationStyled
                                        onChange={handlerPaginationChange}
                                        page={page}
                                        pageSize={pageSize}
                                        pageSizes={pageSizes}
                                        totalItems={totalItems}
                                    />
                                )}
                            </TableContainer>
                            )
                            : (
                                <EmptyWrapper>Нет данных по справочнику</EmptyWrapper>
                            );
};
