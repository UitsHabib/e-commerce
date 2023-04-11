import { configureStore } from "@reduxjs/toolkit";
import promise from "redux-promise-middleware";
import { logger } from "redux-logger";
import reducers from "./reducers";

const middlewares = [promise, logger];

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(middlewares),
});

export default store;
