import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Col, Row } from "reactstrap";
import base_url from "../component/BootApi";
import { getToken } from "../component/utils/AuthApi";

function EditProfile() {
  const [user, setUser] = useState([]);
  const [userProfile, setUserProfile] = useState(null); // Updated to null
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.title = "Profile";
    fetchUserDetail();
  }, []);

  function fetchUserDetail() {
    const token = getToken();
    if (!token) return;
    axios
      .get(`${base_url}/ebook/user/edit-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error("Error fetching book detail:", error));
  }

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setUserProfile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  //   update user
  const updateUser = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return;
    var password = document.getElementById("password").value;
    const formData = new FormData();
    formData.append(
      "userDetail",
      new Blob([JSON.stringify(user)], { type: "application/json" })
    );
    formData.append("userProfile", userProfile);
    formData.append("password", password);
    axios
      .put(`${base_url}/ebook/user/update_profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">edit Profile</h4>
              {message && <div className="alert alert-info">{message}</div>}
              <Form onSubmit={updateUser}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    value={user.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={user.email || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.phoneNo || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Profile</Form.Label>
                  <Form.Control
                    type="file"
                    id="userProfile"
                    onChange={onFileChange}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    {user.profilePic && (
                      <img
                        src={`${base_url}/auth/getUserProfile/${user.profilePic}`}
                        height="100"
                        width="100"
                      />
                    )}
                  </Col>
                  <Col>
                    {imagePreview && (
                      <img src={imagePreview} alt="Image Preview" width="100" />
                    )}
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    required
                  />
                </Form.Group>
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
export default EditProfile;
