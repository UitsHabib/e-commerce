import axios from "axios";
import Types from "./admin.types";

export function getAdmins() {
    return {
        type: Types.GET_ADMINS,
        payload: axios({
            method: 'GET',
            url: `http://localhost:3001/admins`
        })
    }
}

export function storeAdmin(data) {
    return {
        type: Types.STORE_ADMIN,
        payload: axios({
            method: 'POST',
            data,
            url: `http://localhost:3001/admins`
        })
    }
}

export function getAdmin(id) {
    return {
        type: Types.GET_ADMIN,
        payload: axios({
            method: 'GET',
            url: `http://localhost:3001/admins/${id}`
        })
    }
}

export function deleteAdmin(id) {
    return {
        type: Types.DELETE_ADMIN,
        payload: axios({
            method: 'DELETE',
            url: `http://localhost:3001/admins/${id}`
        })
    }
}
export function updateAdmin(data,id) {
    return {
        type: Types.UPDATE_ADMIN,
        payload: axios({
            method: 'PUT',
            data,
            url: `http://localhost:3001/admins/${id}`
        })
    }
}