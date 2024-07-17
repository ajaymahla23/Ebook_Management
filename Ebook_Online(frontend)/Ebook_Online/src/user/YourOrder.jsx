import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import base_url from "../component/BootApi";
import { getToken } from "../component/utils/AuthApi";

function YourOrder(args) {
  const [myBookOrder, SetMyBookOrder] = useState([]);
  const [selectedBookOrders, setSelectedBookOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    document.title = "Your Order";
    fetchOrderData();
  }, []);

  function fetchOrderData() {
    const token = getToken();
    if (!token) return;
    axios
      .get(`${base_url}/ebook/user/your_order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Order data : ", response.data);
        SetMyBookOrder(response.data.myOrderBookList);
      });
  }

  const handleViewDetails = (orderId) => {
    const order = myBookOrder.find((order) => order.orderId === orderId);
    if (order) {
      setSelectedBookOrders(order.bookOrderList);
      setSelectedOrderId(orderId);
      toggle();
    }
  };

  return (
    <>
      <div className="container">
        <Card>
          <CardBody>
            <Table className="text-center">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Name</th>
                  <th>Total Price(₹)</th>
                  <th>Payment Type</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {myBookOrder.map((myOrder) => (
                  <tr key={myOrder.id}>
                    <th scope="row">{myOrder.orderId}</th>
                    <td>{myOrder.username}</td>
                    <td>{myOrder.totalOrderAmt}</td>
                    <td>{myOrder.paymentType}</td>
                    <td>
                      <Button
                        color="danger"
                        onClick={() => handleViewDetails(myOrder.orderId)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>

      {/* modal fomr */}
      <div>
        <Modal isOpen={modal} toggle={toggle} {...args}>
          <ModalHeader toggle={toggle}>
            Book Order Details : {selectedOrderId}
          </ModalHeader>
          <ModalBody>
            <Table className="text-center">
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Price(₹)</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {selectedBookOrders.map((bookOrder) => (
                  <tr key={bookOrder.id}>
                    <td>{bookOrder.bookName}</td>
                    <td>{bookOrder.author}</td>
                    <td>{bookOrder.price}</td>
                    <td>{bookOrder.totaQty}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
export default YourOrder;
