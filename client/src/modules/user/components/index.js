import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../user.actions';
import Table from '../../core/components/table/table.component';
import UserDelete from './user-remove.component';

const UserList = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.userReducer.userList);
    const [deleteShow, setDeleteShow] = useState(false);
    const [id, setId] = useState('');


    useEffect(() => {
        async function users() {
            dispatch(getUsers())
        }
        users();
      
    }, [])

    const handleAdminDelete = (id) => {
        setId(id);
        setDeleteShow(true);
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
                    <button onClick={() => handleAdminDelete(data.id)} className='btn btn-sm btn-danger text-white mx-1'>
                        <i className='bi bi-trash'></i>
                    </button>

                </td>
            }
        }
    ]

    return (
        <div className="card shadow mb-1">
            <div className="card-body">
                <div className="table-responsive">
                    <Table
                        columns={columns}
                        data={users}
                        limit={5}
                        sorting={true}
                        pagination={true}
                    />
                </div>
               
            </div>

        <UserDelete
            onShow ={deleteShow}
            onHandleClose={() => setDeleteShow(false)}
            id={id}
        />

        </div>
        
    )
}

export default UserList