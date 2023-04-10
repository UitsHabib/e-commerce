import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
    const dashboardCard = [
        "User",
        "Product",
        "Order",
        "Shop",
        "Customer",
        "Profile",
        "Service",
        "Permission",
    ];
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="border" style={{ minHeight: "100px" }}>
                    <div class="row mt-4">
                        {dashboardCard.map((number, index) => {
                            const url = `/admin/${dashboardCard[
                                index
                            ].toLowerCase()}`;

                            return (
                                <>
                                    <div class="col-xl-3 col-md-12 mb-4">
                                        <Link
                                            to={url}
                                            style={{
                                                display: "block",
                                                textDecoration: "none",
                                                color: "inherit",
                                            }}
                                        >
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="d-flex">
                                                        <h4>
                                                            {
                                                                dashboardCard[
                                                                    index
                                                                ]
                                                            }
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
