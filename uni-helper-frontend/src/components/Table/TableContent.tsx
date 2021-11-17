import React from 'react';
import type { TableInstance } from 'react-table';

const TableContent = <T extends {}>({
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    page,
}: TableInstance<T>) => (
    <table {...getTableProps()} className="bg-white w-full h-full">
        <thead className="block">
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="flex w-full">
                    {headerGroup.headers.map(column => (
                        <th className="border-b p-4 text-left flex-1" {...column.getHeaderProps()}>
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()} className="block overflow-auto" style={{ maxHeight: '70vh' }}>
            {page.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} className="flex w-full">
                        {row.cells.map(cell => (
                            <td className="border-b p-4 flex-1" {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>
                        ))}
                    </tr>
                );
            })}
        </tbody>
    </table>
);

export default TableContent;
