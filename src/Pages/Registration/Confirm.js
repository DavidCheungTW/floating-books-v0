import React, { Component } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Button, AppBar } from "@mui/material";
import { Register } from "../../services/accountService";

export class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    Register(this.props.values).then((result) => {
      window.location.href = "/login";
    });
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { firstName, lastName, email, postalAddress, userName },
    } = this.props;
    return (
      <>
        <AppBar title="Confirm User Data" />
        <List>
          <ListItem>
            <ListItemText primary="Username" secondary={userName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="First Name" secondary={firstName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={lastName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Postal Address" secondary={postalAddress} />
          </ListItem>
        </List>
        <br />

        <Button color="secondary" variant="contained" onClick={this.back}>
          Back
        </Button>

        <Button color="primary" variant="contained" onClick={this.continue}>
          Confirm & Continue
        </Button>
      </>
    );
  }
}

export default Confirm;
