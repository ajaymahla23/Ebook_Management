import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import base_url from "../component/BootApi";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { getToken } from "../component/utils/AuthApi";

function Checkout() {
  const [cartItem, setCartItem] = useState([]);
  const [totalCartAmount, setTotalCartAmount] = useState("");
  const [user, setUser] = useState("");
  const [orderData, SetOrderData] = useState({
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    paymentType: "",
  });

  useEffect(() => {
    document.title = "Checkout";
    fetchCartItem();
  }, []);

  const fetchCartItem = () => {
    const token = getToken();
    if (!token) return;

    axios
      .get(`${base_url}/ebook/user/checkout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTotalCartAmount(response.data.totalCartAmount);
        setCartItem(response.data.cartItemList);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log("Error fetching cart items:", error);
      });
  };

  const deleteCart = (cartId) => {
    const token = getToken();
    if (!token) return;
    axios
      .delete(`${base_url}/ebook/user/delete/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Your item deleted successfully.");
        fetchCartItem();
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.alert("Something went wrong!!!");
      });
  };

  function buyToNow() {
    const token = getToken();
    if (!token) return;
    try {
      var formData = new FormData();
      formData.append("orderData", JSON.stringify(orderData));
      formData.append("totalCartAmount", totalCartAmount);
      axios
        .post(`${base_url}/ebook/user/buy`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          toast.success("Your payment has been successfully.");
          // fetchCartItem();
        });
    } catch (error) {
      console.log(error);
    } finally {
      fetchCartItem();
    }
  }

  const handleInput = (e) => {
    SetOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="row">
        <Col sm={6}>
          <div>
            <Card>
              <CardBody>
                <h5>Total price : ₹ {totalCartAmount}</h5>
                <Table className="text-center">
                  <thead>
                    <tr>
                      <th>Book Name</th>
                      <th>Author</th>
                      <th>Qty</th>
                      <th>Price(₹)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItem.length === 0 ? (
                      <p className="text-center">No cart item available.</p>
                    ) : (
                      cartItem.map((cart) => (
                        <tr key={cart.cartId}>
                          <td>
                            <strong>{cart.bookName}</strong>
                          </td>
                          <td>{cart.author}</td>
                          <td>{cart.qty}</td>
                          <td>{cart.price}</td>
                          <td>
                            <Button
                              className="bg-danger border-0"
                              onClick={() => deleteCart(cart.cartId)}
                            >
                              <MdDelete />
                            </Button>{" "}
                          </td>
                          <td>{cart.totalCartAmount}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Col>
        <Col sm={6}>
          <div>
            <Card>
              <CardBody>
                <h4>Your detail for Order</h4>
                <Form onSubmit={buyToNow}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="examplePassword">Name</Label>
                        <Input type="text" value={user.name} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input
                          value={user.email}
                          name="email"
                          placeholder="with a placeholder"
                          type="email"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="exampleAddress">Address</Label>
                    <Input
                      name="address"
                      value={orderData.address}
                      onChange={handleInput}
                      placeholder="Enter address"
                    />
                  </FormGroup>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Mobile Number</Label>
                        <Input type="text" value={user.phoneNo} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Locality</Label>
                        <Input
                          placeholder="with a placeholder"
                          type="text"
                          name="landmark"
                          value={orderData.landmark}
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleCity">City</Label>
                        <Input
                          id="exampleCity"
                          name="city"
                          value={orderData.city}
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="exampleState">State</Label>
                        <Input
                          id="exampleState"
                          name="state"
                          value={orderData.state}
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="exampleZip">Zip</Label>
                        <Input
                          id="exampleZip"
                          name="pincode"
                          value={orderData.pincode}
                          onChange={handleInput}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup>
                    <Label for="exampleSelect">Select</Label>
                    <Input
                      name="paymentType"
                      type="select"
                      value={orderData.paymentType}
                      onChange={handleInput}
                    >
                      <option>--select payment--</option>
                      <option value="COD">Cash On Delivery(COD)</option>
                    </Input>
                  </FormGroup>
                  <div className="text-center">
                    <Button type="submit" className="bg-warning border-0">
                      Buy Now
                    </Button>{" "}
                    <Button className="bg-success border-0">
                      <Link
                        className="text-decoration-none text-white"
                        to="/ebook/user/home"
                      >
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Col>
      </div>
    </div>
  );
}

export default Checkout;
