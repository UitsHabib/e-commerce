import axios from "axios";
import Types from "./service.types";

export function getServices() {
    return {
        type: Types.GET_SERVICE,
        payload: axios({
            method: "GET",
            url: `http://localhost:3001/service`,
        }),
    };
}

export function storeService(data) {
    return {
        type: Types.STORE_SERVICE,
        payload: axios({
            method: "POST",
            data,
            url: `http://localhost:3001/service`,
        }),
    };
}

export function getService(id) {
    return {
        type: Types.GET_SERVICE,
        payload: axios({
            method: "GET",
            url: `http://localhost:3001/service/${id}`,
        }),
    };
}

export function deleteService(id) {
    return {
        type: Types.DELETE_SERVICE,
        payload: axios({
            method: "DELETE",
            url: `http://localhost:3001/service/${id}`,
        }),
    };
}
export function updateService(data, id) {
    return {
        type: Types.UPDATE_SERVICE,
        payload: axios({
            method: "PUT",
            data,
            url: `http://localhost:3001/service/${id}`,
        }),
    };
}
