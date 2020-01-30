export interface SearchMeta {
    count: number;
    suggest: string | null;
}

export interface WithSearchMeta<T> {
    content: T[];
    meta: SearchMeta;
}
