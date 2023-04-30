import axios from "axios";
import Types from "./permission.types";

export function getPermissions() {
    return {
        type: Types.GET_PERMISSIONS,
        payload: axios({
            method: "GET",
            url: `http://localhost:3001/permissions`,
        }),
    };
}
export function getPermission(id) {
    return {
        type: Types.GET_PERMISSION,
        payload: axios({
            method: "GET",
            url: `http://localhost:3001/permissions/${id}`,
        }),
    };
}

export function storePermission(data) {
    return {
        type: Types.STORE_PERMISSION,
        payload: axios({
            method: "POST",
            data,
            url: `http://localhost:3001/permissions`,
        }),
    };
}

export function deletePermission(id) {
    return {
        type: Types.DELETE_PERMISSION,
        payload: axios({
            method: "DELETE",
            url: `http://localhost:3001/permissions/${id}`,
        }),
    };
}
export function updatePermission(data, id) {
    return {
        type: Types.UPDATE_PERMISSION,
        payload: axios({
            method: "PUT",
            data,
            url: `http://localhost:3001/permissions/${id}`,
        }),
    };
}
