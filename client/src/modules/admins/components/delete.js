import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import Button from '../../core/components/button.component';
import { useDispatch } from 'react-redux';
import { deleteAdmin } from '../admin.actions';

const AdminDelete = ({ onShow, onHandleClose, id }) => {

    const dispatch = useDispatch();

    const handleDelete = (id) => {

        async function destroy() {
            try {
                dispatch(deleteAdmin(id))
                onHandleClose();
                toast('Admin Deleted!')
            }
            catch (err) {
                toast.error('Something went wrong')
            }
        }
        destroy();

    }

    return (
        <Modal show={onShow} onHide={onHandleClose}>
            <Modal.Body>
                <div className="container my-2">
                    <h5 className='text-center my-4'>Are you sure?</h5>
                    <div className='d-flex justify-content-center'>
                        <Button className='btn btn-primary btn-sm px-2 mx-3' onEvent={()=>handleDelete(id)} text={`Yes. continue`} />
                        <Button className='btn btn-danger btn-sm px-2 mx-3' onEvent={onHandleClose} text={`Cancel`}/>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AdminDelete