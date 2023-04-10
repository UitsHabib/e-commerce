import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button.component";
import axios from "axios";

const TableBody = ({ columns, items }) => {
    const navigate = useNavigate();
    console.log(items);

    const editAdminHandler = (id) => {
        navigate("/edit/" + id);
        console.log(id);
    };

    const deleteHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/admins/${id}`);
            alert("successfully deleted");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <tbody>
                {items.map((item, index) => {
                    return (
                        <tr key={index}>
                            {columns.map((column, id) => {
                                if (column.path) {
                                    return (
                                        <>
                                            <td key={`col-${id}`} scope="row">
                                                {item[column.path]}
                                            </td>
                                        </>
                                    );
                                }
                                return (
                                    <td>
                                        <Button
                                            type="submit"
                                            text="Edit"
                                            className="btn btn-primary mx-2"
                                            onEvent={() => editAdminHandler(item.id)}
                                        />

                                        <Button
                                            type="submit"
                                            text="Delete"
                                            className="btn btn-danger"
                                            onEvent={() => deleteHandler(item.id)}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </>
    );
};

export default TableBody;
