import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Column } from 'react-table';
import { v4 as uuid } from 'uuid';
import type { ISubjectBaseDataFragment } from '../../../generated-typings/graphql-types';
import { useSubjectPaginationQuery } from '../../../generated-typings/graphql-types';
import SearchBar from '../Search';
import SubjectSettingsButton from './SubjectDetails/SubjectSettingsButton';
import Table from '../Table';
import { useMessageContext } from '../../contexts/MessageContext';

const columns: Column<ISubjectBaseDataFragment>[] = [
    {
        Header: 'Neptun ID',
        accessor: 'neptunId',
        minWidth: 150,
    },
    {
        Header: 'Name',
        accessor: 'name',
        width: '100%',
    },
    {
        Header: 'University',
        accessor: 'university',
        minWidth: 150,
    },
    {
        Header: 'Credits',
        accessor: 'credits',
        minWidth: 100,
    },
    {
        Header: '',
        accessor: '_id',
        id: 'edit',
        minWidth: 150,
        width: 150,
        Cell: ({ value }) => <SubjectSettingsButton subjectId={value} />,
    },
];

const AdminDashboardPage: React.FC = () => {
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [searchFilter, setSearchFilter] = useState('');
    const { data, loading, error } = useSubjectPaginationQuery({
        fetchPolicy: 'cache-first',
        variables: { page: page + 1, perPage, filter: searchFilter },
    });
    const { addMessage } = useMessageContext();

    if (error) {
        addMessage({ id: uuid(), message: error.message, type: 'ERROR' });
    }

    const fetchData = (newPage: number, newPerPage: number) => {
        setPage(newPage);
        setPerPage(newPerPage);
    };

    return (
        <>
            <div className="mb-8 flex justify-between">
                <SearchBar setFilter={setSearchFilter} />

                <Link to="/subjects" className="ml-16 px-4 bg-blue-500 text-white font-medium flex items-center">
                    New subject
                </Link>
            </div>

            <Table
                loading={loading}
                columns={columns}
                data={data?.SubjectPagination?.items}
                pageCount={data?.SubjectPagination?.pageInfo.pageCount ?? 0}
                totalCount={data?.SubjectPagination?.pageInfo.itemCount ?? -1}
                fetchData={fetchData}
                getColumnClass={columnId => columnId === 'university' || columnId === 'credits' ? 'hidden lg:block' : 'block'}
            />
        </>
    );
};

export default AdminDashboardPage;
