import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function Toastmsg({ message }) {
    const [show, setShow] = useState(true);
    const [position, setPosition] = useState("top-start");

    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={7000}
                autohide
            >
                <Toast.Header>
                    <strong className="text-danger me-2">Error!</strong>
                    <small className="text-danger">{message}</small>
                </Toast.Header>
            </Toast>
        </ToastContainer>
    );
}

export default Toastmsg;
