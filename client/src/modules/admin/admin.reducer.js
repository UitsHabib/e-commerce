import Types from "./admin.types";
const initialState = {
    adminList: [],
    admin: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_ADMINS_FULFILLED: {
            return { ...state, adminList: action.payload.data };
        }
        case Types.STORE_ADMIN_FULFILLED: {
            return { ...state };
        }
        case Types.GET_ADMIN_FULFILLED: {
            return { ...state, admin: action.payload.data };
        }
        case Types.DELETE_ADMIN_FULFILLED: {
            return { ...state };
        }
        case Types.UPDATE_ADMIN_FULFILLED: {
            return { ...state };
        }
    }
    return state;
}
