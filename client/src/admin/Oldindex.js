import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { getAdmins } from './admin.actions';
import Table from '../common/Oldtable.component';
import AdminCreate from './create';
import AdminEdit from './edit';
import AdminDelete from './delete';
import Pagination from '../common/Oldpagination.component';

const AdminList = () => {

    const dispatch = useDispatch();
    const admins = useSelector(state => state.adminReducer.adminList);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [id, setId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [sortColumn, setSortColumn] = useState("Id");
    const [sortOrder, setSortOrder] = useState("asc");


    useEffect(() => {
        async function adminList() {
            dispatch(getAdmins())
        }
        adminList();
      
    }, [])

    const paginatedUsers = () => {
        
        const column = columns.find((column) => column.name === sortColumn);
        const sortedUsers = _.orderBy(admins, column.path, sortOrder);

        const offset = (currentPage - 1 ) * limit;
        const paginatedUsers =  _.drop(sortedUsers, offset).slice(0, limit);
        return paginatedUsers;
        
    }

    const handleAdminEdit = (data) => {
        setEditShow(true);
        setId(data.id);
    }

    const handleAdminDelete = (data) => {
        setDeleteShow(true);
        setId(data.id);
    }

    const onHandleSort = (column, order) => {
        setSortColumn(column);
        setSortOrder(order);
    }

    const columns = [
        {
            name: 'Id',
            path: 'id'
        },
        {
            name: 'First Name',
            path: 'first_name'
        },
        {
            name: 'Last Name',
            path: 'last_name'
        },
        {
            name: 'Username',
            path: 'username'
        },
        {
            name: 'Email',
            path: 'email'
        },
        {
            name: 'Action',
            getContent: (data, index) => {
                return <td key={`col-${index}`}>
                    <button onClick={() => handleAdminEdit(data)} className='btn btn-sm btn-info text-white'>
                        <i className='bi bi-pencil'></i>
                    </button>
                    <button onClick={() => handleAdminDelete(data)} className='btn btn-sm btn-danger text-white mx-1'>
                        <i className='bi bi-trash'></i>
                    </button>

                </td>
            }
        }
    ]

    return (
        <div className="card shadow-md mb-4">
            <div className="card-header py-3 d-flex justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Admin List</h6>
                <button className='btn btn-sm btn-success' onClick={() => setAddShow(true)}>Add</button>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <Table
                        columns={columns}
                        data={paginatedUsers()}
                        sortOrder={sortOrder}
                        sortColumn={sortColumn}
                        onHandleSort={onHandleSort}
                    />
                </div>
                <Pagination 
                    data={admins} 
                    limit={limit} 
                    currentPage={currentPage} 
                    setCurrentPage={setCurrentPage}
                />
            </div>

            <AdminCreate
                onShow={addShow}
                onHandleClose={() => setAddShow(false)}
            />

            <AdminEdit
                onShow={editShow}
                id={id}
                onHandleClose={() => setEditShow(false)}
            />
            <AdminDelete
                onShow={deleteShow}
                id={id}
                onHandleClose={() => setDeleteShow(false)}
            />

        </div>
    )
}

export default AdminList