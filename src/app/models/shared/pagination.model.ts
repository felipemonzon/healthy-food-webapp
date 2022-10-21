export interface Pagination {
    /** Página actual. */
    currentPage: number;
    /** Páginas totales. */
    totalPages: number;
    /** Página final. */
    lastPage: boolean;
    /** Página inicial. */
    firstPage: boolean;
}