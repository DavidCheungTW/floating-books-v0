import "../styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/Login/loginPage";
import Nav from "../Pages/Navigation/nav";
import RegistrationPage from "../Pages/Registration/registerPage";
import FooterSection from "../Pages/Footer/footer";
import HomePage from "../Pages/Home/homePage";
import AddBookPage from "../Pages/Book/addBookPage";
import ContactUsPage from "../Pages/ContactUs/contactUsPage";
import AboutUsPage from "../Pages/AboutUs/aboutUsPage";
import DashboardPage from "../Pages/Book/dashboardPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
      <FooterSection />
    </div>
  );
}

export default App;
