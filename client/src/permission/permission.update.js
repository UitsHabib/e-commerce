const onSubmit = async (values) => {
    console.log("Valuesssssssssss", values);
    // try {
    //     const response = await axios.post("http://localhost:3000/users", {
    //         name: values.name,
    //         description: values.description,
    //     });
    //     console.log("MY response", response);
    // } catch (error) {
    //     console.log("internal server error", error);
    // }
};

const PermissionUpdate = () => {
    const initialValues = {
        name: "",
        description: "",
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card my-5">
                        <div className="text-center card-header">
                            <h3>Permission</h3>
                        </div>
                        <div className="card-body cardbody-color p-lg-5">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={permissionCreateSchema}
                                onSubmit={onSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form>
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    htmlFor="name"
                                                >
                                                    Name
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    placeholder="Enter a permission name"
                                                />
                                                <span class="text-danger">
                                                    <ErrorMessage name="name" />
                                                </span>
                                            </div>
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    htmlFor="description"
                                                >
                                                    Description
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="description"
                                                    className="form-control"
                                                    id="description"
                                                    style={{ height: "140px" }}
                                                    as="textarea"
                                                    rows={5}
                                                    placeholder="Write a description here..."
                                                />
                                                <span class="text-danger">
                                                    <ErrorMessage name="description" />
                                                </span>
                                            </div>

                                            <button
                                                type="submit"
                                                className="btn btn-primary mt-2"
                                            >
                                                Update
                                            </button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionUpdate;
