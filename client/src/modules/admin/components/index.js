import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAdmins } from '../admin.actions';
import Table from '../../core/components/table/table.component';
import AdminCreate from './admin-form.component';
import AdminEdit from './admin-edit.component';
import AdminDelete from './admin-remove.component';

const AdminList = () => {

    const dispatch = useDispatch();
    const admins = useSelector(state => state.adminReducer.adminList);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        async function adminList() {
            dispatch(getAdmins())
        }
        adminList();
      
    }, [])

    const handleAdminEdit = (data) => {
        setEditShow(true);
        setId(data.id);
    }

    const handleAdminDelete = (data) => {
        setDeleteShow(true);
        setId(data.id);
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
        <div className="card shadow mb-1">
            <div className="card-header  d-flex justify-content-between">
                <div></div>
                {/* <h6 className="m-0 font-weight-bold text-primary">Admin List</h6> */}
                <button className='btn btn-sm btn-success' onClick={() => setAddShow(true)}>Add</button>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <Table
                        columns={columns}
                        data={admins}
                        limit={5}
                        sorting={true}
                        pagination={true}
                    />
                </div>
               
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