import Thead from './Oldthead.component';
import Tbody from './tbody.component';

const Table = ({ columns, data, sortColumn, sortOrder, onHandleSort }) => {

    return (

            <table className="table" width="100%">
                <Thead
                    columns={columns}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onHandleSort={onHandleSort}
                />

                <Tbody data={data} columns={columns} />
            </table>

    )
}

export default Table