import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardText, CardTitle, Col, Row } from "reactstrap";
import { RxPlusCircled, RxBorderWidth } from "react-icons/rx";
import { FiBookOpen } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";

function Admin() {
  return (
    <div className="container">
     
      <Row className="text-center">
      <h1 className="mb-5">Welcome to Admin Panel</h1>
        <Col sm="3">
          <Card body>
            <CardTitle tag="h5">Add books</CardTitle>
            <CardText>
              <RxPlusCircled style={{ fontSize: "xxx-large" }} />
            </CardText>
            <Button>
              <Link
                className="text-decoration-none text-white"
                to="/ebook/admin/add"
              >
                Add book
              </Link>
            </Button>
          </Card>
        </Col>
        <Col sm="3">
          <Card body>
            <CardTitle tag="h5">Book List</CardTitle>
            <CardText>
              <FiBookOpen style={{ fontSize: "xxx-large" }} />
            </CardText>
            <Button>
              {" "}
              <Link
                className="text-decoration-none text-white"
                to="/ebook/admin/list"
              >
                Book List
              </Link>
            </Button>
          </Card>
        </Col>
        <Col sm="3">
          <Card body>
            <CardTitle tag="h5">Orders</CardTitle>
            <CardText>
              <RxBorderWidth style={{ fontSize: "xxx-large" }} />
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
        <Col sm="3">
          <Card body>
            <CardTitle tag="h5">Logout</CardTitle>
            <CardText>
              <TbLogout style={{ fontSize: "xxx-large" }} />
            </CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Admin;
