import { configureStore } from "@reduxjs/toolkit";
import promise from "redux-promise-middleware";
import { logger } from "redux-logger";
import reducers from "./reducers";

const middlewares = [promise, logger];

// if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
//     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// }

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middlewares),
});

export default store;
