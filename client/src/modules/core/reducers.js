import { combineReducers } from "redux";
import userReducer from "../user/user.reducer";
import adminReducer from "../admin/admin.reducer";
import permissionReducer from "../permission/permission.reducer";

export default combineReducers({
    userReducer,
    adminReducer,
    permissionReducer,
});
