import React, { useState } from 'react';
import type { Column } from 'react-table';
import type { ISubjectSchema } from '../../../generated-typings/graphql-types';
import { useSubjectPaginationQuery } from '../../../generated-typings/graphql-types';
import ContentPage from '../layout/ContentPage';
import Table from '../Table';

const columns: Column<ISubjectSchema>[] = [
    {
        Header: 'Neptun ID',
        accessor: 'neptunId',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Faculty',
        accessor: 'faculty',
    },
    {
        Header: 'Credits',
        accessor: 'credits',
    },
];

const AdminDashboardPage: React.FC = () => {
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const { data, loading } = useSubjectPaginationQuery({
        fetchPolicy: 'cache-first',
        variables: { page: page + 1, perPage },
    });

    const fetchData = (newPage: number, newPerPage: number) => {
        setPage(newPage);
        setPerPage(newPerPage);
    };

    return (
        <ContentPage>
            <Table
                loading={loading}
                columns={columns}
                data={data?.SubjectPagination?.items}
                pageCount={data?.SubjectPagination?.pageInfo.pageCount ?? 0}
                totalCount={data?.SubjectPagination?.pageInfo.itemCount ?? -1}
                fetchData={fetchData}
            />
        </ContentPage>
    );
};

export default AdminDashboardPage;
