import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "reactstrap";
import base_url from "../component/BootApi";
import { getToken } from "../component/utils/AuthApi";

function SellOldBook() {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [about, setAbout] = useState("");
  const [bookImage, setBookImage] = useState(null); // Updated to null
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [bookCategory, setBookCategory] = useState("O");

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setBookImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null); // Clear preview if no file
    }
  };

  const saveBookDetail = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    if (setBookImage) {
      const formData = new FormData();
      formData.append(
        "bookDetails",
        new Blob(
          [
            JSON.stringify({
              bookName,
              author,
              price,
              bookCategory,
              about,
            }),
          ],
          {
            type: "application/json",
          }
        )
      );
      formData.append("bookImage", bookImage);
      try {
        axios
          .post(`${base_url}/ebook/admin/add`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
          .then(
            (response) => {
              toast.success("Book added successfully!!!");
              setBookImage(null); // Clear image file
              setImagePreview(null); // Clear image preview
            },
            (error) => {
              console.log("see error :", error);
            }
          );
      } catch (error) {
        console.log("see catch error :", error);
      } finally {
        setBookName("");
        setAuthor("");
        setPrice("");
        setBookImage(null); // Clear image file
        setImagePreview(null); // Clear image preview
        setBookCategory("");
        setAbout("");
      }
    } else {
      console.log("error");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 shadow">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">Sell Old Book</h4>
              <ToastContainer />
              <Form onSubmit={saveBookDetail}>
                <Form.Group className="mb-3">
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Book Name"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter author"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>About</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Enter about"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Photo</Form.Label>
                  <Form.Control
                    type="file"
                    name="bookImage"
                    id="bookImage"
                    onChange={onFileChange}
                  />
                  {imagePreview && (
                    <div>
                      <img src={imagePreview} alt="Image Preview" width="100" />
                    </div>
                  )}
                </Form.Group>
                <div className="text-center">
                  <Button variant="warning" type="reset" className="text-white">
                    Reset
                  </Button>{" "}
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}

export default SellOldBook;
