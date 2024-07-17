import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { doLogout, getCurrentUserDetail, isLoggedIn } from "./utils/AuthApi";
import { NavbarBrand } from "reactstrap";

function HeaderPage() {
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [search, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const data = localStorage.getItem("data");
  const role = null;
  try {
    role = JSON.parse(data).roles;
  } catch (error) {
    console.log("user is not login");
  }

  // function handleSearch(){
  //   axios.get(`${base_url}/ebook/user/search/${search}`).then((response) => {
  //     console.log("response search :", response.data);
  //     setSearchKeyword(response.data);
  //   });
  // }

  // const handleViewDetails = (search) => {
  //   //alert("seeac : ",search)

  //   console.log("key work d:",search)
  //  navigate(`/ebook/user/search/${search}`);
  // };

  // const handleInput = (e) => {
  //   e.preventDefault();
  //   setSearchKeyword({ ...search, [e.target.name]: e.target.value });
  // };

  useEffect(() => {
    setLogin(isLoggedIn());
    setCurrentUser(getCurrentUserDetail());
  }, [login]);

  const logoutUser = () => {
    doLogout(() => {
      // logout
      setLogin(false);
      navigate("/");
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/ebook/user/search?search=${search}`);
  };

  const handleInput = (event) => {
    setSearchKeyword(event.target.value);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link
            className="text-success text-decoration-none"
            to="/ebook/user/home"
          >
            <img
              alt="logo"
              src="https://reactstrap.github.io/logo-white.svg"
              style={{
                height: 40,
                width: 40,
              }}
            />
            Ebooks
          </Link>{" "}
          <Link
            className="text-success text-decoration-none"
            to="/ebook/admin/dashboard"
          >
            Admin
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              name="keyword"
              value={search}
              onChange={handleInput}
            />
            <Link>
              <Button type="submit" variant="outline-success mx-2">
                Search
              </Button>
            </Link>
          </Form>

          {login && (
            <>
              <Link to={`/ebook/user/profile/${currentUser.email}`}>
                <Button variant="outline-success mx-1">
                  {" "}
                  {currentUser.email}
                </Button>
              </Link>
              {role === "ROLE_ADMIN" && (
                <Link to={"/ebook/admin/dashboard"}>
                  <Button variant="outline-success mx-1">Admin</Button>
                </Link>
              )}

              {role === "ROLE_USER" && (
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">
                    {" "}
                    <Link
                      className="text-decoration-none text-secondary"
                      to="/ebook/user/setting"
                    >
                      Setting
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    <Link
                      className="text-decoration-none text-secondary"
                      to="/ebook/user/checkout"
                    >
                      Cart
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />

                  <NavDropdown.Item href="#action5">
                    <Button onClick={logoutUser} variant="outline-success mx-1">
                      Logout
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Button onClick={logoutUser} variant="outline-success mx-1">
                Logout
              </Button>
            </>
          )}
          {!login && (
            <>
              <Link to={"/login"}>
                <Button variant="outline-success mx-1">Login</Button>
              </Link>

              <Link to={"/signup"}>
                <Button variant="outline-success mx-1">Signup</Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderPage;
