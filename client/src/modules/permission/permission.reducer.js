import Types from "./permission.types";
const initialState = {
    permissionList: [],
    permission: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_PERMISSIONS_FULFILLED: {
            return {
                ...state,
                permission: action.payload.data,
            };
        }
        case Types.GET_PERMISSION_FULFILLED: {
            return {
                ...state,
                permissionList: action.payload.data.permissions,
            };
        }

        case Types.STORE_PERMISSION_FULFILLED: {
            return { ...state };
        }
        case Types.DELETE_PERMISSION_FULFILLED: {
            return { ...state };
        }
        case Types.UPDATE_PERMISSION_FULFILLED: {
            return { ...state };
        }
    }
    return state;
}
