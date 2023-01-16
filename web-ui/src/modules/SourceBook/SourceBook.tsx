import { useAuthorization} from '@vtb-ermo/authorization';
import axios, { Canceler, CancelToken } from 'axios';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { СolumnInfoDto, FilterDto, ListDto } from '~/shared/models';
import { assertDefined, isDefined } from '~/helpers/guards';
import { useApi } from '~/shared/ApiContext';
import * as S from './styled';
import { SourceBookContext } from './SourceBookContext';
import { Table, Filters } from './components';

type TypeProps = {
    book: string;
};
export const SourceBook: FC<TypeProps>  = ({book}) => {

    const [title, setTitle] = useState('');
    const [columns, setColumns] = useState<СolumnInfoDto[]>([]);  
    const [filters, setFilters] = useState<FilterDto[]>([]); 
    const [lists, setLists] = useState<ListDto[]>([]);   
    const [observableUpdate, forceUpdate] = useState({});
    const sourceBookContext = useMemo(() => {
        return { observableUpdate, forceUpdate };
    }, [observableUpdate]);

    const { sourceBookApi } = useApi();
    const wasUnmount = useRef(false);
    const requestSourceParams = { name: book };
    
    const onFilterMenuClickOutside = ({ closeMenu }: any, event: Event) => {
        if (event.target) {
            return;
        }
        closeMenu();
    };
    /**
     * Получаем столбцы
     */
    const getColumns = useCallback(
        (cancelToken: CancelToken) => {
            sourceBookApi
                .getSourceBooks(requestSourceParams, { cancelToken })
                .then(({ data }) => {
                    if (wasUnmount.current)
                        return;     
                    assertDefined(data?.title, 'data?.title');  
                    setTitle(data?.title);       
                    assertDefined(data?.columns, 'data?.columns');
                    setColumns(data?.columns);
                    assertDefined(data?.filters, 'data?.filters');
                    setFilters(data?.filters);
                    assertDefined(data?.lists, 'data?.lists');                    
                    setLists(data?.lists);
                })
                .catch((err) => {
                    if (!(err instanceof axios.Cancel)) {
                        console.error('sourceBookApi.getColumns error', err);
                    }
                });
        },
        [sourceBookApi, requestSourceParams]
    );

    useEffect(() => {
        let cancel: Canceler;
        const cancelToken = new axios.CancelToken(function executor(c) {
            cancel = c;
        });

        wasUnmount.current = false;
        getColumns(cancelToken);
        return () => {
            cancel?.();
            wasUnmount.current = true;
        };
    }, [observableUpdate]);
    
    return (        
        <SourceBookContext.Provider value={sourceBookContext}>
            <h2>{title}</h2>
            <S.ListWrapper data-at='list-board'>
                <Table columns ={columns} filters={filters} lists={lists} book={book}/>
            </S.ListWrapper>
        </SourceBookContext.Provider>
    );
};
