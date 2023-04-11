import axios from "axios";
import Types from './user.types';

export default function getUser(){
    return {
        type: Types.GET_USER,
        payload:axios({
            method:'GET',
            url:`https://dummyjson.com/users`
        })
    }
}

export function getUsers(){
    return {
        type: Types.GET_USERS,
        payload:axios({
            method:'GET',
            url:`http://localhost:3001/users`
        })
    }
}
export function deleteUser(id){
    return {
        type: Types.DELETE_USER,
        payload:axios({
            method:'DELETE',
            url:`http://localhost:3001/users/${id}`
        })
    }
}
