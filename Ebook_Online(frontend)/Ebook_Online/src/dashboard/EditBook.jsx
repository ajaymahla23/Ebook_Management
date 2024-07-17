import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import base_url from "../component/BootApi";
import { getToken } from "../component/utils/AuthApi";

function EditBook() {
  const { bookId } = useParams();
  const [bookDetail, setBookDetail] = useState({});
  const [bookImage, setBookImage] = useState(null); // Updated to null
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  useEffect(() => {
    document.title = "Book detail";
    // fetch book detail
    fetchBookDetail();
  }, [bookId]);

  function fetchBookDetail() {
    const token = getToken();
    if (!token) return;
    axios
      .get(`${base_url}/ebook/admin/edit/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBookDetail(response.data);
      })
      .catch((error) => console.error("Error fetching book detail:", error));
  }

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setBookImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  //   update book detail
  const updateBookDetail = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    // if (bookImage) {
    const formData = new FormData();
    formData.append(
      "bookDetails",
      new Blob([JSON.stringify(bookDetail)], { type: "application/json" })
    );
    formData.append("bookImage", bookImage);

    axios
      .put(`${base_url}/ebook/admin/update/${bookId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Book updated successfully!!!");
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
    // } else {
    //   toast.error("Please select an image to upload.");
    // }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBookDetail((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">edit Book</h4>
              <Form onSubmit={updateBookDetail}>
                <Form.Group className="mb-3">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="bookName"
                    value={bookDetail.bookName || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    id="author"
                    value={bookDetail.author || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    id="price"
                    value={bookDetail.price || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Book Category</Form.Label>
                  <Form.Control
                    as="select"
                    id="bookCategory"
                    value={bookDetail.bookCategory || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">--select--</option>
                    <option value="N">New</option>
                    <option value="O">Old</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    id="status"
                    value={bookDetail.status || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">--select--</option>
                    <option value="Y">Active</option>
                    <option value="N">Inactive</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>About</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={bookDetail.about || ""}
                    onChange={handleInputChange}
                    placeholder="Enter about"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Photo</Form.Label>
                  <Form.Control
                    type="file"
                    id="bookImage"
                    onChange={onFileChange}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    {bookDetail.bookImg && (
                      <img
                        src={`${base_url}/ebook/admin/getBookImg/${bookDetail.bookImg}`}
                        height="100"
                        width="100"
                        alt="Existing Book"
                      />
                    )}
                  </Col>
                  <Col>
                    {imagePreview && (
                      <img src={imagePreview} alt="Image Preview" width="100" />
                    )}
                  </Col>
                </Row>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}
export default EditBook;
