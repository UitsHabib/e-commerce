import Types from "./service.types";
const initialState = {
    serviceList: [],
    service: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET_SERVICE_FULFILLED: {
            return { ...state, serviceList: action.payload.data };
        }
        case Types.STORE_SERVICE_FULFILLED: {
            return { ...state };
        }
        case Types.GET_SERVICE_FULFILLED: {
            return { ...state, service: action.payload.data };
        }
        case Types.DELETE_SERVICE_FULFILLED: {
            return { ...state };
        }
        case Types.UPDATE_SERVICE_FULFILLED: {
            return { ...state };
        }
    }
    return state;
}
