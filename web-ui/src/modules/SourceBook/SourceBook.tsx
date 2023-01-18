import axios, { Canceler, CancelToken } from 'axios';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { СolumnInfoDto, FilterDto, ListDto } from '~/shared/models';
import { assertDefined, isDefined } from '~/helpers/guards';
import { useApi } from '~/shared/ApiContext';
import { ModulesPageWrapper, FormBookStyled, ListWrapper, ButtonsWrapper }  from './styled';
import { SourceBookContext } from './SourceBookContext';
import { Table, Filters } from './components';
import { Button } from '@vtb/ui-kit3';
import { ModuleHeader } from '~/components/ModuleHeader';
import { TypeFormMode } from '~/constants/types';
import { BicModal } from '../Bic/components/BicModal';
import { useHistory } from 'react-router'
import { ModalAlert, ModalConfirm } from '~/components/Modals';

type TypeProps = {
    book: string;
};
export const SourceBook: FC<TypeProps>  = ({book}) => {
    const history = useHistory();
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
    const [mode, setMode] = useState<TypeFormMode>(TypeFormMode.NEW);
    const [selectedId, setSelectedId] = useState<any>(undefined);
    const [modalForm, setModalForm] = useState(false);
    //Открытие формы алерта
    const [modalAlertForm, setModalAlertForm] = useState(false);
    //Сообщение для Алерта
    const [modalAlertMessage, setModalAlertMessage] = useState<string>('');
    
    //Открытие модульной формы
    const openModal = useCallback((id: string | undefined, mode: TypeFormMode) => {
        //передача ИД
        setMode(mode);
        setModalForm(true);
    }, []);

    //Закрытие модульной формы
    const closeModal = useCallback(() => setModalForm(false), []);

    /**
     * Добавление новой записи
     */
    const handleNewRequest = useCallback(
        () => openModal(undefined, TypeFormMode.NEW),
        [openModal]
    );

    
    /**
     * Удаление записи 
     * Пример сообщения
     */
    const handleDeleteRequest = ()=>
    {
        setModalAlertForm(true);
        setModalAlertMessage(
            'Вы действительно хотите удалить запись?'
        );
    };

    //Не подтверждаем
    const handleCancelApply = () => {
        setModalAlertForm(false);
        setModalAlertMessage('');
    };
    
    //Подтверждаем
    const handleConfirm = () => {
        setModalAlertForm(false);
        setModalAlertMessage('');
    };

    /**
     * Сохранение и закрытие 
     */
    const handleSave = useCallback(async () => {
        closeModal();
        //обновление грида

    }, [closeModal]);

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
        <ModulesPageWrapper>
            <ModuleHeader
                title={title ?? 'Не указан'}>
                <ButtonsWrapper>
                    <Button dimension='s' appearance='secondary' onClick={handleDeleteRequest}>
                        Удалить
                    </Button>
                    <Button dimension='s' appearance='primary' onClick={handleNewRequest}>
                        Добавить
                    </Button>
                </ButtonsWrapper>
            </ModuleHeader>
            <FormBookStyled>                  
                <SourceBookContext.Provider value={sourceBookContext}>
                    <ListWrapper data-at='list-board'>
                        <Table columns ={columns} filters={filters} lists={lists} book={book}/>
                    </ListWrapper>
                </SourceBookContext.Provider>
            </FormBookStyled> 
            {modalForm && (
                <BicModal
                    mode={mode}
                    bicCode={selectedId}
                    onClose={closeModal}
                    onSave={handleSave}
                />
            )}            
            {
                modalAlertForm && (<ModalConfirm open={modalAlertForm} onConfirm={handleConfirm} onCancel={handleCancelApply} text={modalAlertMessage} />)
            }
        </ModulesPageWrapper>
    );
};
