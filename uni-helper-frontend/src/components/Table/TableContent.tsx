import React from 'react';
import type { TableInstance } from 'react-table';

export interface Props {
    getColumnClass: (columnId: string) => string;
}

const TableContent = <T extends {}>({
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    page,
    getColumnClass,
}: Props & TableInstance<T>) => (
    <table {...getTableProps()} className="bg-white w-full">
        <thead className="block">
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} className="flex">
                    {headerGroup.headers.map(column => (
                        <th
                            className={`border-b p-4 text-left ${getColumnClass(column.id)}`}
                            {...column.getHeaderProps({
                                style: { width: column.width, minWidth: column.minWidth },
                            })}
                        >
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {page.map((row) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} className="flex">
                        {row.cells.map(cell => (
                            <td
                                className={`border-b p-4 ${getColumnClass(cell.column.id)}`}
                                {...cell.getCellProps({
                                    style: { width: cell.column.width, minWidth: cell.column.minWidth },
                                })}
                            >
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
