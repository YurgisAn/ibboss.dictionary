export type Nullable<T> = T | null;

export type PaginationResponse<T> = {
    data: T[];
    paging: Paging;
};

export type Paging = {
    count?: number;
    limit: number;
    offset: number;
    total?: number;
};

export type AnyObject = { [key: string]: any };
