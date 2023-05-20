import React, { Component } from "react";
import { TextField, Button, AppBar } from "@mui/material";
import "./userForm.css";

export class FormUserDetails extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    passwordMatch: "",
  };

  validateState = () => {
    const newErrors = {};
    Object.keys(this.state).forEach((key) => {
      if (!this.props.values[key]) {
        newErrors[key] = "This field is required.";
      } else {
        if (key === "email") {
          if (this.validateEmail(this.props.values[key])) {
            console.log("hit");
            newErrors[key] = "Invalid email address";
          }
        } else {
          newErrors[key] = "";
        }
      }
    });

    this.validatePasswords();

    this.setState({
      firstName: newErrors.firstName,
      lastName: newErrors.lastName,
      email: newErrors.email,
      password: newErrors.password,
      confirmPassword: newErrors.confirmPassword,
    });
  };

  validateEmail = (email) => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  isFormValid = () => {
    const { values } = this.props;
    const formState = [
      values.firstName,
      values.lastName,
      values.email,
      values.password,
      values.confirmPassword,
    ];
    return formState.every((value) => Boolean(value));
  };

  validatePasswords = () => {
    const { values } = this.props;
    if (values.password === values.confirmPassword) {
      return true;
    } else {
      this.setState({
        passwordMatch: "Passwords must match",
      });
      return false;
    }
  };

  continue = (e) => {
    e.preventDefault();
    const { values } = this.props;
    this.validateState();
    if (
      this.isFormValid() &&
      this.validatePasswords() &&
      !this.validateEmail(values.email)
    ) {
      this.props.nextStep();
    }
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <>
        <AppBar title="Enter User Details" />
        <TextField
          placeholder="Enter Your First Name"
          label="First Name"
          onChange={handleChange("firstName")}
          defaultValue={values.firstName}
          margin="normal"
          fullWidth
        />
        {this.state.firstName && (
          <span className="errorMessage">{this.state.firstName}</span>
        )}
        <br />
        <TextField
          placeholder="Enter Your Last Name"
          label="Last Name"
          onChange={handleChange("lastName")}
          defaultValue={values.lastName}
          margin="normal"
          fullWidth
        />
        {this.state.lastName && (
          <span className="errorMessage">{this.state.lastName}</span>
        )}
        <br />
        <TextField
          placeholder="Enter Your Email"
          type="email"
          label="Email"
          onChange={handleChange("email")}
          defaultValue={values.email}
          margin="normal"
          fullWidth
        />
        {this.state.email && (
          <span className="errorMessage">{this.state.email}</span>
        )}
        <br />
        <TextField
          placeholder="Enter Your Password"
          type="password"
          label="Password"
          onChange={handleChange("password")}
          defaultValue={values.password}
          margin="normal"
          fullWidth
        />
        {this.state.password && (
          <span className="errorMessage">{this.state.password}</span>
        )}
        <br />
        <TextField
          placeholder="confirm password"
          type="password"
          label="Confirm password"
          onChange={handleChange("confirmPassword")}
          defaultValue={values.confirmPassword}
          margin="normal"
          fullWidth
        />
        {this.state.confirmPassword && (
          <span className="errorMessage">{this.state.confirmPassword}</span>
        )}
        <br />
        {this.state.passwordMatch && (
          <p className="errorMessage">{this.state.passwordMatch}</p>
        )}
        <br />
        <Button
          // data-testId="page1-next-page"
          color="primary"
          variant="contained"
          onClick={this.continue}
        >
          Continue
        </Button>
      </>
    );
  }
}

export default FormUserDetails;
