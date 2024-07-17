import axios from "axios";
import React, { useEffect, useState } from "react";
import base_url from "../component/BootApi";
import { getToken } from "../component/utils/AuthApi";
import { Navigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState([]);
  const [bookOrder, setBookOrder] = useState([]);
  

  useEffect(() => {
    document.title = "Your Profile";
    fetchUserInfoAndOrders();
  }, []);

  const fetchUserInfoAndOrders = () => {
    const token = getToken();
    if (!token) return;
    axios
      .get(`${base_url}/ebook/user/view_profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        console.log("response.data ", response.data);
        setBookOrder(response.data.myOrderBookList);
      });
  };

  const handleRemoveUser = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    const token = getToken();
    if (!token) return;
    const userId = user.userId;
    if(confirmed){
      axios
      .delete(`${base_url}/ebook/user/delete_user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((respone) => {
        localStorage.removeItem("data");
        alert("Your account deleted successfully!!!");
        Navigate("/");
      });
    }
   
  };

  return (
    <>
      <div className="container">
        {user ? (
          <div
            className="card p-5 mt-5"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <h4 className="card-title text-center">User Information</h4>
            <div className="card-body">
              <div className="col-md-10 mx-auto">
                <div className="card mb-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-2">
                      <div className="d-flex justify-content-center align-items-center mb-4">
                        <img
                          src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                          alt="Profile"
                          className="rounded-circle"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-md-10">
                      <div className="card-body">
                        <div className="form-group row">
                          <label className="col-md-2 col-form-label fw-bold">
                            ID:
                          </label>
                          <div className="col-md-10">
                            <p className="card-text">{user.userId}</p>
                          </div>
                        </div>
                        <hr />

                        <div className="form-group row">
                          <label className="col-md-2 col-form-label fw-bold">
                            Name:
                          </label>
                          <div className="col-md-10">
                            <p className="card-text">{user.name}</p>
                          </div>
                        </div>
                        <hr />

                        <div className="form-group row">
                          <label className="col-md-2 col-form-label fw-bold">
                            Mobile No:
                          </label>
                          <div className="col-md-10">
                            <p className="card-text">{user.phoneNo}</p>
                          </div>
                        </div>
                        <hr />

                        <div className="form-group row">
                          <label className="col-md-2 col-form-label fw-bold">
                            Email:
                          </label>
                          <div className="col-md-10">
                            <p className="card-text">{user.email}</p>
                          </div>
                        </div>
                        <hr />

                        <div className="form-group row">
                          <label className="col-md-2 col-form-label fw-bold">
                            Roles:
                          </label>
                          <div className="col-md-10">
                            <ul className="list-unstyled">
                              {/* {user.roles.map((role) => (
                                <li key={role.id} className="card-text">
                                  {role.name}
                                </li>
                              ))} */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="card-title text-center">Order History</h4>
                {bookOrder.length > 0 ? (
                  <table className="table table-bordered table-hover shadow">
                    <thead>
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Book Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Price (₹)</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookOrder.map((order) =>
                        order.bookOrderList.map((orderDetail, index) => (
                          <tr key={index}>
                            <td>{order.orderId}</td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>{orderDetail.bookName}</td>
                            <td>{orderDetail.author}</td>
                            <td>{orderDetail.totaQty}</td>
                            <td>{orderDetail.price}</td>
                            <td>{order.paymentType}</td>
                            <td>
                              {order.address +
                                ", " +
                                order.city +
                                ", " +
                                order.state +
                                ", " +
                                order.pincode}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                ) : (
                  <p>You have not made any bookings yet.</p>
                )}
                <div className="d-flex justify-content-center">
                  <div className="mx-2">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={handleRemoveUser}
                    >
                      Delete account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
}
export default Profile;
