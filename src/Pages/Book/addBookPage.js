import React, { useEffect, useState } from "react";
import { Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button, Select, MenuItem, InputLabel } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import "./addBook.css";
import { GetUserDetails } from "../../services/accountService";
import { AddBook } from "../../services/bookService";
import { GetGenres } from "../../services/genreService";

const formatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};

const AddBookPage = () => {
  const [genreList, setGenreList] = useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const storedData = localStorage.getItem("userDetails");
    setUserData(JSON.parse(storedData));
    GetUserDetails(localStorage.getItem("userDetails"), setUserDetails);
  }, []);

  const [bookData, setBookData] = useState({
    title: "",
    isbn: "",
    author: "",
    selectGenre: "",
    releaseDate: "",
    image: "",
    donatorComment: "",
    donateDate: formatDate(new Date()),
  });

  useEffect(() => {
    GetGenres(setGenreList);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setBookData((prevData) => ({ ...prevData, [name]: e.target.files[0] }));
    } else {
      setBookData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const genreId = genreList.filter((a) => a.genre === bookData.selectGenre)[0]
      .id;

    const bookDetails = {
      ...bookData,
      genreId: genreId,
      ownerId: userDetails.id,
      donatorId: userDetails.id,
    };

    AddBook(bookDetails, userData)
      .then((res) => {
        if (res.status === 201) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("addbook catch error", error.message);
      });
  };

  return (
    <Container className="addBookForm" sx={{ paddingTop: "10px" }}>
      <form onSubmit={handleSubmit}>
        <h2>Add Book</h2>
        <TextField
          label="Title"
          type="text"
          required={true}
          name="title"
          value={bookData.title}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <br />
        <TextField
          label="ISBN"
          type="text"
          required={true}
          name="isbn"
          value={bookData.isbn}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Author"
          type="text"
          required={true}
          name="author"
          value={bookData.author}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <InputLabel id="selectGenreLabel">Genre:</InputLabel>
        <Select
          required={true}
          id="selectGenre"
          name="selectGenre"
          value={bookData.selectGenre}
          onChange={handleChange}
        >
          {genreList.map((g) => (
            <MenuItem key={g.genre} value={g.genre}>
              {g.genre}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Release Date"
          type="date"
          required={true}
          name="releaseDate"
          value={bookData.releaseDate}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Image url"
          type="file"
          required={true}
          name="image"
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <TextField
          label="Donator Comment"
          type="text"
          required={true}
          name="donatorComment"
          value={bookData.donatorComment}
          onChange={handleChange}
          multiline
          rows={5}
          // maxRows={4}
          margin="normal"
          fullWidth
        />

        <Button variant="outlined" type="submit">
          Add Book
        </Button>
      </form>
    </Container>
  );
};

export default AddBookPage;
