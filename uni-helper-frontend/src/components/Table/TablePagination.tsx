import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect } from 'react';
import type { TableInstance } from 'react-table';
import PaginationButton from './PaginationButton';

export interface Props<T extends {}> extends TableInstance<T> {
    totalCount: number;
    fetchData: (page: number, newPerPage: number) => void;
}

const TablePagination = <T extends {}>({
    pageCount,
    state,
    setPageSize,
    totalCount,
    gotoPage,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    fetchData,
}: Props<T>) => {
    useEffect(() => {
        fetchData(state.pageIndex, state.pageSize);
    }, [fetchData, state.pageIndex, state.pageSize]);

    return (
        <div className="bg-white h-20 pb-4 flex justify-end items-end">
            <select
                value={state.pageSize}
                onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    gotoPage(0);
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSizeOption => (
                    <option key={pageSizeOption} value={pageSizeOption}>
                        Show
                        {' '}
                        {pageSizeOption}
                    </option>
                ))}
            </select>
            <span className="mx-4">
                {`${state.pageIndex * state.pageSize + 1}-${Math.min(
                    (state.pageIndex + 1) * state.pageSize,
                    totalCount,
                )} of ${totalCount}`}

            </span>
            <PaginationButton
                onClick={() => {
                    gotoPage(0);
                }}
                disabled={!canPreviousPage}
                icon={faAngleDoubleLeft}
            />
            <PaginationButton onClick={previousPage} disabled={!canPreviousPage} icon={faAngleLeft} />
            <PaginationButton onClick={nextPage} disabled={!canNextPage} icon={faAngleRight} />
            <PaginationButton
                onClick={() => {
                    gotoPage(pageCount - 1);
                }}
                disabled={!canNextPage}
                icon={faAngleDoubleRight}
            />
        </div>
    );
};

export default TablePagination;
