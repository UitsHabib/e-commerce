import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logout from "../../user/components/logout.component";

function Fullnavbar({ user }) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <strong>e-Commerce</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>Products</Nav.Link>
                    </Nav>
                    <Nav className="me-auto  col-md-6">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control border"
                                required
                            />
                            <span className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary bg-white border ms-n5"
                                    type="button"
                                >
                                    <i className="bi bi-search"></i>
                                </button>
                            </span>
                        </div>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            Cart
                            <i className="bi bi-cart-fill">
                                <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    9
                                </span>
                            </i>
                        </Nav.Link>
                        <NavDropdown
                            title={
                                <>
                                    {user} <i className="bi bi-person-fill"></i>
                                </>
                            }
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item>
                                <i className="bi bi-person"></i> Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Logout />
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Fullnavbar;
