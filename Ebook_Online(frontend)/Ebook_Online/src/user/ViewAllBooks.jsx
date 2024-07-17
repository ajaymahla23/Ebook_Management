import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from "reactstrap";
import base_url from "../component/BootApi";
import { getToken } from "../component/utils/AuthApi";

function ViewAllBooks() {
  const { bookCategory } = useParams({});
  const [books, setBooks] = useState([]);

  useEffect(() => {
    document.title = "Books";
    fetchAllBooks();
  }, []);

  function fetchAllBooks() {
    const token = getToken();
    if (!token) return;
    axios
      .get(`${base_url}/ebook/user/book/${bookCategory}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          setBooks(response.data.content);
        },
        (error) => {
          console.log("error :", error);
        }
      );
  }

  return (
    <div className="container">
      <h1>
        {bookCategory === "New"
          ? "New Books"
          : bookCategory === "Old"
          ? "Old Books"
          : bookCategory === "recent"
          ? "Recent books"
          : "Undefined"}{" "}
      </h1>
      <div className=" d-flex gap-2">
        {books.length === 0 ? (
          <p>
            {bookCategory === "New"
              ? "No New books available."
              : bookCategory === "Old"
              ? "No Old books available."
              : bookCategory === "recent"
              ? "No Recent books available."
              : "Undefined"}
          </p>
        ) : (
          books.map((detail, index) => (
            <Card
              key={index}
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
                <CardTitle tag="h5">{detail.bookName}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {detail.author}
                </CardSubtitle>
                <CardText>
                  Category:{" "}
                  {detail.bookCategory === "N"
                    ? "New"
                    : detail.bookCategory === "O"
                    ? "Old"
                    : "Undefined"}
                </CardText>
                <ButtonGroup className="mb-2">
                  <Button className="bg-danger border-0">Add Cart</Button>
                  <Button className="bg-success border-0">
                    <Link
                      className="text-decoration-none text-white"
                      to={`/ebook/user/detail/${detail.bookId}`}
                    >
                      View
                    </Link>
                  </Button>
                  <Button className="bg-danger border-0">
                    ₹{detail.price}
                  </Button>
                </ButtonGroup>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
export default ViewAllBooks;
