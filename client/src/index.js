import React from "react";
import ReactDOM from "react-dom/client";
import App from "./modules/core/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./modules/core/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
