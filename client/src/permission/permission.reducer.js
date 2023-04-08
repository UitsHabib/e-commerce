import Types from "./permission.types";

const initialState = {
    permissionList: {},
};

export default function reducer(state = initialState, action) {
    // console.log(action.payload);
    switch (action.type) {
        case Types.GET_PERMISSIONS_FULFILLED: {
            return { ...state, permissionList: action.payload.data };
        }
    }
    return state;
}
