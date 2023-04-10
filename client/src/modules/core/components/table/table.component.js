import { useState } from 'react';
import Thead from './thead.component';
import Tbody from './tbody.component';
import Pagination from '../pagination.component';

const Table = ({ columns, data, limit, sorting, pagination }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState("Id");
    const [sortOrder, setSortOrder] = useState("asc");

    const modifiedData = () => {

        const column = columns.find((column) => column.name === sortColumn);
        let sortedData = data;

        if (sorting) {
            sortedData = _.orderBy(data, column.path, sortOrder);
        }
        const offset = (currentPage - 1) * limit;
        let paginatedData = sortedData;

        if (pagination) {
            paginatedData = _.drop(sortedData, offset).slice(0, limit)
        } else {
            paginatedData = sortedData;
        }

        return paginatedData;

    }

    const onHandleSort = (column, order) => {
        setSortColumn(column);
        setSortOrder(order);
    }

    return (
        <>
            <table className="table" width="100%">
                <Thead
                    columns={columns}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onHandleSort={onHandleSort}
                    sorting={sorting}
                />

                <Tbody data={modifiedData()} columns={columns} />
            </table>

            {
                pagination && <Pagination
                    data={data}
                    limit={limit}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            }
        </>
    )
}

export default Table
