import axios from "axios";

const sendEmail = (emailData, setErrorMessage) => {
  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/api/email`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/api/email`;
  }

  return axios.post(endpoint, emailData).catch(() => {
    setErrorMessage("Server error. Please try again later.");
  });
};

export default sendEmail;
