import React from 'react';
import type { Column } from 'react-table';
import { useTable, usePagination } from 'react-table';
import TableContent from './TableContent';
import TablePagination from './TablePagination';

export interface Props<T extends {}> {
    loading: boolean;
    columns: Column<T>[];
    data?: T[] | null;
    pageCount: number;
    totalCount: number;
    fetchData: (page: number, newPerPage: number) => void;
}

const Table = <T extends {}>({
    loading,
    columns,
    data,
    pageCount,
    totalCount,
    fetchData,
}: Props<T>) => {
    const tableInstance = useTable({ columns, data: data ?? [], manualPagination: true, pageCount }, usePagination);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (!data) {
        return <h1>No data...</h1>;
    }

    return (
        <div>
            <TableContent {...tableInstance} />

            <TablePagination {...tableInstance} totalCount={totalCount} fetchData={fetchData} />
        </div>
    );
};

export default Table;
