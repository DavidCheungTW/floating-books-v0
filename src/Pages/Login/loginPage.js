import React, { useState } from "react";
import { Button, TextField, Grid, Container } from "@mui/material";
import { Login } from "../../services/accountService";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import "./loginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      setErrorMessage("Please input missing data!");
      return;
    }

    try {
      const userData = await Login(loginData);

      if (userData.user.emailVerified) {
        localStorage.setItem("userDetails", JSON.stringify(userData.user));
        setErrorMessage("");
        navigate("/");
        window.location.reload(true);
      } else {
        await sendEmailVerification(userData.user);
        setErrorMessage("Please do email verification!");
      }
    } catch (error) {
      setErrorMessage("Authentication failed");
    }
  };

  return (
    <Container sx={{ paddingTop: "10px" }}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <h2>Login</h2>
          <Grid item xs={12}>
            <TextField
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              label="email"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              label="Password"
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            {errorMessage && (
              <p className="authenticatedFailed">{errorMessage}</p>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            // data-testid="login"
            type="submit"
            fullWidth
          >
            Login
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginPage;
