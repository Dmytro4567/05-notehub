import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}

export default function Pagination({currentPage, onPageChange, totalPages}: PaginationProps) {
    if (totalPages < 1) return null;
    return (
        <ReactPaginate
            pageCount={totalPages}
            forcePage={currentPage - 1}
            onPageChange={(e) => onPageChange(e.selected + 1)}
            containerClassName={css.pagination}
            activeClassName={css.active}
            previousClassName={currentPage === 1 ? css.disabled : ''}
            nextClassName={currentPage === totalPages ? css.disabled : ''}
            disabledClassName={css.disabled}
            nextLabel="→"
            previousLabel="←"
        />
    );
}
