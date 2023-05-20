import React, { Component } from "react";
import { AppBar } from "@mui/material";
import { Register } from "../../services/accountService";

export class Success extends Component {
  continue = (e) => {
    const { history } = this.props;

    e.preventDefault();
    Register(this.props.values)
      .then((result) => {
        history.push("/login");
      })
      .catch((error) => {
        // setErrorMessage(error.message.replace("Firebase: ", ""));
      });

    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <>
        <AppBar title="Success" />
        <h1>Thank You For Your Submission</h1>
        <p>You will get an email with further instructions.</p>
      </>
    );
  }
}

export default Success;
