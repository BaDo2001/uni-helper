import React from 'react';
import type { Column } from 'react-table';
import { useTable, usePagination } from 'react-table';
import Spinner from '../Spinner';
import TableContent from './TableContent';
import TablePagination from './TablePagination';

export interface Props<T extends {}> {
    loading: boolean;
    columns: Column<T>[];
    data?: T[] | null;
    pageCount: number;
    totalCount: number;
    fetchData: (page: number, newPerPage: number) => void;
    getColumnClass: (columnId: string) => string;
}

const Table = <T extends {}>({ loading, columns, data, pageCount, totalCount, fetchData, getColumnClass }: Props<T>) => {
    const tableInstance = useTable({ columns, data: data ?? [], manualPagination: true, pageCount }, usePagination);

    if (loading) {
        return <Spinner />;
    }

    if (!data) {
        return <h1>No data</h1>;
    }

    const pagination = <TablePagination {...tableInstance} totalCount={totalCount} fetchData={fetchData} />;

    return (
        <div>
            {pagination}
            <TableContent getColumnClass={getColumnClass} {...tableInstance} />
            {pagination}
        </div>
    );
};

export default Table;
