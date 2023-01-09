/**
 * Инициализируем контекст бля БИКов
 */
import { createContext, useContext } from 'react';

export const SourceBookContext = createContext<{
    observableUpdate: {};
    forceUpdate: (v: any) => void;
}>({} as any);

export const useSourcebookContext = () => {
    const ctx = useContext(SourceBookContext);
    return ctx;
};
