export interface SearchMeta {
    count: number;
    suggest: string[];
}

export interface WithSearchMeta<T> {
    content: T[];
    meta: SearchMeta;
}
