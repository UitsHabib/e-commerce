import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logout from "./logout.component";

function Fullnavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">e-Commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link>Products</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            Cart <i className="bi bi-cart-fill"></i>
                        </Nav.Link>
                        <NavDropdown
                            title={
                                <>
                                    User <i className="bi bi-person-fill"></i>
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
