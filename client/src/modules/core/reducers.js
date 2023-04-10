import { combineReducers } from "redux";
import userReducer from '../users/user.reducer';
import adminReducer from '../admins/admin.reducer';

export default combineReducers({
    userReducer,
    adminReducer

})