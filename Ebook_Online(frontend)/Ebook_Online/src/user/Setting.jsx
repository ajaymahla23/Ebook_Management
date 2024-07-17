import React from "react";
import { FaBookOpen, FaBoxOpen, FaRegIdCard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

function Setting() {
  return (
    <>
      <div>
        <Container className="text-center">
          <Row xs="3">
            <Col className="bg-light border">
              <Card body>
                <CardTitle tag="h5">Sell Old Book</CardTitle>
                <CardText>
                  <FaBookOpen style={{ fontSize: "xxx-large" }} />
                </CardText>
                <Link to="/ebook/user/sellbook">
                  <Button>Go somewhere</Button>
                </Link>
              </Card>
            </Col>
            <Col className="bg-light border">
              <Card body>
                <CardTitle tag="h5">See Old Book</CardTitle>
                <CardText>
                  <FaBookOpen style={{ fontSize: "xxx-large" }} />
                </CardText>
                <Link to="/ebook/user/old-books">
                  <Button>Go somewhere</Button>
                </Link>
              </Card>
            </Col>
            <Col className="bg-light border">
              <Card body>
                <CardTitle tag="h5">Login & Security(Edit Profile)</CardTitle>
                <CardText>
                  <FaRegIdCard style={{ fontSize: "xxx-large" }} />
                </CardText>
                <Link to="/ebook/user/edit-profile">
                  <Button>Go somewhere</Button>
                </Link>
              </Card>
            </Col>
          </Row>

          <Row xs="3" className="mt-2">
            <Col className="bg-light border">
              <Card body>
                <CardTitle tag="h5">Your Address</CardTitle>
                <CardText>
                  <FaLocationDot style={{ fontSize: "xxx-large" }} />
                </CardText>
                <Button>Edit Address</Button>
              </Card>
            </Col>
            <Col className="bg-light border">
              <Card body>
                <CardTitle tag="h5">My Orders</CardTitle>
                <CardText>
                  <FaBoxOpen style={{ fontSize: "xxx-large" }} />
                </CardText>
                <Link to="/ebook/user/your_order">
                  <Button>Track Your Order</Button>
                </Link>
              </Card>
            </Col>
            <Col className="bg-light border">
              <Card body>
                <CardTitle tag="h5">Logout</CardTitle>
                <CardText>
                  <TbLogout style={{ fontSize: "xxx-large" }} />
                </CardText>
                <Button>Session Out</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
export default Setting;
