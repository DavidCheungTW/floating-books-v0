import React, { useState, useEffect } from "react";
import { Grid, Container } from "@mui/material";
import { GetUserDetails } from "../../services/accountService";
import {
  GetOrderBooks,
  UpdateOrder,
  UpdateBook,
} from "../../services/bookService";
import sendEmail from "../../services/sendEmail";
import OrderBookList from "../../components/orderBookList";

const DashboardPage = () => {
  const [userDetails, setUserDetails] = useState();
  const [orderBooks, setOrderBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  let orderingBook = [];
  let followupBook = [];
  let historyBook = [];

  useEffect(() => {
    GetUserDetails(localStorage.getItem("userDetails"), setUserDetails);
  }, []);

  useEffect(() => {
    GetOrderBooks(setOrderBooks, setErrorMessage);
  }, [errorMessage]);

  const updateStatus = async (order, newStatus, bookId = 0) => {
    UpdateOrder(order.id, newStatus, setErrorMessage);

    if (newStatus === "received") {
      UpdateBook(bookId, userDetails.id, setErrorMessage);
    }

    if (newStatus === "accept") {
      // send email to requestor, your request is accept @@@
      const emailData = {};
      emailData.from = "";
      emailData.to = order.user.email;
      emailData.subject = `${order.book.title} request is accepted!`;
      let message = `<p style='font-weight:bold;'> Dear ${order.user.userName},</p> Your book request is accepted. Thank you very much. <p style='font-weight:bold;'> Sincerely, Floating Books Admin</p> `;
      emailData.html = message;

      sendEmail(emailData, setErrorMessage);

      // send email to owner about the address or requestor @@@
      emailData.to = order.book.owner.email;
      emailData.subject = `${order.book.title} deliver information details!`;
      message = `<p style='font-weight:bold;'> Dear ${order.book.owner.userName},</p> Please deliver your book to: <p>TO: ${order.user.firstName},${order.user.lastName} </p> <p>ADDRESS: ${order.user.postalAddress} </p> Thank you very much. <p style='font-weight:bold;'> Sincerely, Floating Books Admin</p> `;
      emailData.html = message;

      sendEmail(emailData, setErrorMessage);
    }

    if (newStatus === "reject") {
      // send email to requestor, your request is rejected @@@
      const emailData = {};
      emailData.from = "";
      emailData.to = order.user.email;
      emailData.subject = `${order.book.title} request is rejected!`;
      const message = `<p style='font-weight:bold;'>Dear ${order.user.userName},</p> Your book request is rejected. Thank you very much. <p style='font-weight:bold;'>Sincerely, Floating Books Admin </p>`;
      emailData.html = message;

      sendEmail(emailData, setErrorMessage);
    }

    if (newStatus === "delivered") {
      // send email to requestor, book is delivered @@@
      const emailData = {};
      emailData.from = "";
      emailData.to = order.user.email;
      emailData.subject = `${order.book.title} is already delivered!`;
      const message = `<p style='font-weight:bold;'>Dear ${order.user.userName}, </p>Your requested book is already delivered. Thank you very much.<p style='font-weight:bold;'> Sincerely, Floating Books Admin </p>`;
      emailData.html = message;

      sendEmail(emailData, setErrorMessage);
    }
  };

  if (userDetails && orderBooks.length > 0) {
    const id = userDetails.id;

    orderingBook = orderBooks.filter((order) => {
      return order.userId === id &&
        order.status !== "received" &&
        order.status !== "reject"
        ? true
        : false;
    });
    followupBook = orderBooks.filter((order) => {
      return order.book.owner.id === id &&
        order.status !== "received" &&
        order.status !== "reject"
        ? true
        : false;
    });
    historyBook = orderBooks.filter((order) => {
      return order.userId === id &&
        (order.status === "received" || order.status === "reject")
        ? true
        : false;
    });
  }

  return (
    <Container className="dashboard" sx={{ paddingTop: "10px" }}>
      <h2>Dashboard</h2>
      <Grid item xs={12}>
        {errorMessage && <p>{errorMessage}</p>}
      </Grid>
      <div className="orderingBook">
        <h3>Ordering Book:</h3>
        {orderingBook.map((order) => (
          <OrderBookList
            key={order.id}
            book={order.book}
            order={order}
            status={order.status}
            updateStatus={updateStatus}
            role={"requestor"}
          />
        ))}
      </div>

      <div className="followupBook">
        <h3>Follow up action:</h3>
        {followupBook.map((order) => (
          <OrderBookList
            key={order.id}
            book={order.book}
            order={order}
            status={order.status}
            updateStatus={updateStatus}
            role={"owner"}
          />
        ))}
      </div>

      <div className="historyBook">
        <h3>Order History:</h3>
        {historyBook.map((order) => (
          <OrderBookList
            key={order.id}
            book={order.book}
            order={order}
            status={order.status}
            updateStatus={updateStatus}
            role={""}
          />
        ))}
      </div>
    </Container>
  );
};

export default DashboardPage;
