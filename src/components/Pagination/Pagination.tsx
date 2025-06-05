import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}

export default function Pagination({ currentPage, onPageChange, totalPages }: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={totalPages}
            forcePage={currentPage - 1}
            onPageChange={(e) => onPageChange(e.selected + 1)}
            containerClassName={css.pagination}
            pageClassName={''}
            pageLinkClassName={''}
            activeClassName={css.active}
            previousClassName={''}
            nextClassName={''}
            previousLinkClassName={''}
            nextLinkClassName={''}
        />
    );
}
