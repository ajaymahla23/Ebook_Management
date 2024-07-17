import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import base_url from "../component/BootApi";
import { Button } from "react-bootstrap";
import { BiSolidRightArrow } from "react-icons/bi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { getToken } from "../component/utils/AuthApi";

function BookList() {
  const [bookDetails, setBookDetails] = useState([]);

  useEffect(() => {
    document.title = "Book List";
    getBookDetailData();
  }, []);

  const getBookDetailData = () => {
    const token = getToken();
    if (!token) return;
    axios
      .get(`${base_url}/ebook/admin/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        (response) => {
          console.log("book detail :", response.data);
          // Extract books from the 'content' field
          const books = response.data.content;
          if (Array.isArray(books)) {
            setBookDetails(books);
          } else {
            console.error("Received data is not an array:", response.data);
          }
        },
        (error) => {
          console.log("error :", error);
        }
      );
  };

  const handleDelete = (bookId) => {
    const token = getToken();
    if (!token) return;
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion
        axios
          .delete(`${base_url}/ebook/admin/delete/${bookId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(
            (response) => {
              Swal.fire("Deleted!", "The book has been deleted.", "success");
              // Filter out the deleted book from the state
              const updatedBooks = bookDetails.filter(
                (book) => book.bookId !== bookId
              );
              setBookDetails(updatedBooks);
            },
            (error) => {
              Swal.fire(
                "Error!",
                "There was an error deleting the book.",
                "error"
              );
              console.log("Error deleting book:", error);
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "The book is safe :)", "error");
      }
    });
  };

  return (
    <div className="container">
      <h1>Book list</h1>
      <Card>
        <CardBody>
          <Table hover className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Photo</th>
                <th>Author</th>
                <th>Price</th>
                <th>Book Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bookDetails) &&
                bookDetails.map((detail) => (
                  <tr key={detail.bookId}>
                    <td>
                      <BiSolidRightArrow />
                    </td>
                    <td>{detail.bookName}</td>
                    <td className="text-center">
                      {detail.bookImg && (
                        <img
                        src={`${base_url}/auth/getBookImg/${detail.bookImg}`}
                          height="70"
                          width="70"
                        />
                      )}
                    </td>
                    <td>{detail.author}</td>
                    <td>{detail.price}</td>
                    <td>
                      {detail.bookCategory === "N"
                        ? "New"
                        : detail.bookCategory === "O"
                        ? "Old"
                        : "Unknown"}
                    </td>

                    <td>
                      {detail.status === "Y"
                        ? "Active"
                        : detail.status === "N"
                        ? "Inactive"
                        : "Unknown"}
                    </td>
                    <td>
                      <Link to={`/ebook/admin/edit/${detail.bookId}`}>
                        <Button variant="primary">Edit</Button>
                      </Link>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(detail.bookId)}
                      >
                        Delete{" "}
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
export default BookList;
