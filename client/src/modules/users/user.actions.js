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