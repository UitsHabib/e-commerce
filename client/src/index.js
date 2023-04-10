import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/modules/core/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/modules/core/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const div = document.getElementById("root");

const root = ReactDOM.createRoot(div);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
