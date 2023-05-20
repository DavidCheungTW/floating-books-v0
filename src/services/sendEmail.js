import axios from "axios";

const sendEmail = (emailData, setErrorMessage) => {
  const endpoint = "http://localhost:4000/api/email";

  return axios.post(endpoint, emailData).catch(() => {
    setErrorMessage("Server error. Please try again later.");
  });
};

export default sendEmail;
