import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Form,
  FormGroup,
} from "reactstrap";
import base_url from "../component/BootApi";
import { getToken } from "../component/utils/AuthApi";

function BookDetail() {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [bookDetail, setBookDetail] = useState({});

  useEffect(() => {
    document.title = "Book Details";
    fetchBookDetail();
  }, [bookId]);

  function fetchBookDetail() {
    const token = getToken();
    if (!token) return;
    axios
      .get(`${base_url}/ebook/user/detail/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          console.log("response data :", response.data);
          setBookDetail(response.data);
        },
        (error) => {
          console.log("error :", error);
        }
      );
  }
  const goBack = () => {
    navigate(-1);
  };

  function addToCart() {
    const token = getToken();
    if (!token) return;
    axios
      .post(`${base_url}/ebook/user/addToCart/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          console.log("response data :", response.data);
          setBookDetail(response.data);
          toast.success(response.data.message);
        },
        (error) => {
          console.log("error :", error);
          toast.alert("We went something wrong!!!");
        }
      );
  }

  return (
    <div className="container">
      <ToastContainer />
      <Form>
        <h4>Book Detail</h4>
        <Card>
          <CardBody>
            <FormGroup row>
              <Col sm={3}>
                {/* <img
                  src={`${base_url}/ebook/admin/getBookImg/${bookDetail.bookImg}`}
                /> */}
                {/* <h1>{bookDetail.user.name}</h1> */}
                <Card
                  style={{
                    width: "18rem",
                  }}
                >
                  <img
                    src={`${base_url}/auth/getBookImg/${bookDetail.bookImg}`}
                    height="200"
                    width="200"
                    style={{ objectFit: "contain" }}
                  />
                  <CardBody>
                    <CardTitle tag="h5">{bookDetail.bookName}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {bookDetail.author}
                    </CardSubtitle>
                    <CardText>
                      Category:{" "}
                      {bookDetail.bookCategory === "N"
                        ? "New"
                        : bookDetail.bookCategory === "O"
                        ? "Old"
                        : "Undefined"}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col sm={9}>
                <CardTitle tag="h5">{bookDetail.bookName}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {bookDetail.author}
                </CardSubtitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Category :
                  {bookDetail.bookCategory === "N"
                    ? "New"
                    : bookDetail.bookCategory === "O"
                    ? "Old"
                    : "Undefined"}
                </CardSubtitle>
                <CardTitle tag="h5">₹{bookDetail.price}</CardTitle>
                <CardText>
                  {bookDetail.about ||
                    " Some quick example text to build on the card title and make up the bulk of the card‘s content."}
                </CardText>
                <Button className="bg-warning border-0" onClick={addToCart}>
                  Add To Cart
                </Button>{" "}
                <Button className="bg-primary border-0">Buy Now</Button>{" "}
                <Button className="bg-danger border-0" onClick={goBack}>
                  Go Back
                </Button>
              </Col>{" "}
            </FormGroup>
          </CardBody>
        </Card>
      </Form>
    </div>
  );
}

export default BookDetail;
