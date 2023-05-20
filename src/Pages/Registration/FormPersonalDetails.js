import React, { Component } from "react";
import { AppBar, TextField, Button } from "@mui/material";

export class FormPersonalDetails extends Component {
  state = {
    userName: "",
    postalAddress: ""
  };

  validateState = () => {
    const newErrors = {};
    Object.keys(this.state).forEach((key) => {
      if (!this.props.values[key]) {
        newErrors[key] = "This field is required.";
      } else {
        newErrors[key] = "";
      }
    });

    this.setState({
      userName: newErrors.userName,
      postalAddress: newErrors.postalAddress
    });
  };

  isFormValid = () => {
    const { values } = this.props;
    const formState = [values.userName, values.postalAddress];
    return formState.every((value) => Boolean(value));
  };

  continue = (e) => {

    e.preventDefault();
    this.validateState()

    if (this.isFormValid()) {
      this.props.nextStep();
    }
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <>
        <AppBar title="Enter you username" />
        <TextField
          placeholder="Enter Your Username"
          label="Username"
          onChange={handleChange("userName")}
          defaultValue={values.userName}
          margin="normal"
          fullWidth
        />
        {this.state.userName && (
          <span className="errorMessage">{this.state.userName}</span>
        )}
        <br />
        <TextField
          placeholder="Postal Address"
          label="Postal Address"
          onChange={handleChange("postalAddress")}
          defaultValue={values.postalAddress}
          margin="normal"
          fullWidth
        />
        {this.state.postalAddress && (
          <span className="errorMessage">{this.state.postalAddress}</span>
        )}
        <br />

        <Button color="secondary" variant="contained" onClick={this.back}>
          Back
        </Button>

        <Button color="primary" variant="contained" onClick={this.continue}>
          Continue
        </Button>
      </>
    );
  }
}

export default FormPersonalDetails;
