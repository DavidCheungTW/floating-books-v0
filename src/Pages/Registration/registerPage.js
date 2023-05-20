import React from "react";
import { Container } from "@mui/material";
import "./registerPage.css";
import { UserForm } from "../Registration/UserForm";

const RegistrationPage = () => {
  return (
    <Container sx={{ paddingTop: "10px" }}>
      <UserForm />
    </Container>
  );
};

export default RegistrationPage;
