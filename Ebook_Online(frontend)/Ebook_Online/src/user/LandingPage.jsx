import axios from "axios";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, CardBody } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { CardSubtitle, CardText, CardTitle } from "reactstrap";
import base_url from "../component/BootApi";

function HomePage() {
  const [newBooks, setNewBooks] = useState([]);
  const [oldBooks, setOldBooks] = useState([]);
  const [recentBooks, setRecentBooks] = useState([]);
  useEffect(() => {
    document.title = "Home";
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get(`${base_url}/auth/landing`)
      .then((response) => {
        console.log("Response data:", response.data);
        const { newBooks, oldBooks, recentBooks } = response.data;
        setNewBooks(newBooks);
        setOldBooks(oldBooks);
        setRecentBooks(recentBooks);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
      });
  };

  const addToCart = async (bookId) => {
    axios
      .post(`${base_url}/ebook/user/addToCart/${bookId}`)
      .then((response) => {
        console.log("Response data:", response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.alert("Something went wrong!!!");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <h1>Recent Books</h1>
        <div className=" d-flex gap-2">
          {recentBooks.length === 0 ? (
            <p>No Recent books available.</p>
          ) : (
            recentBooks.map((detail, index) => (
              <Card
                key={index}
                style={{
                  width: "18rem",
                }}
              >
                <img
                  src={`${base_url}/auth/getBookImg/${detail.bookImg}`}
                  height="200"
                  width="200"
                  style={{ objectFit: "contain" }}
                  alt={`Book ${detail.title}`} // Add an alt attribute for accessibility
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
                    <Button
                      className="bg-danger border-0"
                      onClick={() => addToCart(detail.bookId)}
                    >
                      Add Cart
                    </Button>
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
        <hr />
        <div className="text-end ">
          {" "}
          <Link to={`/ebook/user/book/recent`}>
            <Button>Veiw All</Button>
          </Link>
        </div>
        <hr />
        <h1>New Books</h1>
        <div className=" d-flex gap-2">
          {newBooks.length === 0 ? (
            <p>No New books available.</p>
          ) : (
            newBooks.map((detail, index) => (
              <Card
                key={index}
                style={{
                  width: "18rem",
                }}
              >
                <img
                  src={`${base_url}/auth/getBookImg/${detail.bookImg}`}
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
                    <Button
                      className="bg-danger border-0"
                      onClick={() => addToCart(detail.bookId)}
                    >
                      Add Cart
                    </Button>
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
        <hr />
        <div className="text-end ">
          {" "}
          <Link to={`/ebook/user/book/New`}>
            <Button>Veiw All</Button>
          </Link>
        </div>
        <hr />

        <h1>Old Books</h1>
        <div className=" d-flex gap-2">
          {oldBooks.length === 0 ? (
            <p>No Old books available.</p>
          ) : (
            oldBooks.map((detail, index) => (
              <Card
                key={index}
                style={{
                  width: "18rem",
                }}
              >
                <img
                  src={`${base_url}/auth/getBookImg/${detail.bookImg}`}
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
                    <Button
                      className="bg-danger border-0"
                      onClick={() => addToCart(detail.bookId)}
                    >
                      Add Cart
                    </Button>
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
        <hr />
        <div className="text-end ">
          {" "}
          <Link to={`/ebook/user/book/Old`}>
            <Button>Veiw All</Button>
          </Link>
        </div>
        <hr />
      </div>
    </>
  );
}
export default HomePage;
