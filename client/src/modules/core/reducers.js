import { combineReducers } from "redux";
import userReducer from "../user/user.reducer";
import adminReducer from "../admin/admin.reducer";
import serviceReducer from "../service/service.reducer";

export default combineReducers({ userReducer, adminReducer, serviceReducer });
