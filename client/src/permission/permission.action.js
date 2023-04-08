import axios from "axios";
import Types from "./permission.types";

export function getPermission() {
    return {
        type: Types.GET_PERMISSIONS,
        payload: axios({
            method: "get",
            url: "https://dummyjson.com/todos",
        }),
    };
}
