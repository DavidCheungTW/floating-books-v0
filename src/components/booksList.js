import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import image from "../common/assets/Open_book_nae_02.svg.png";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "./bookList.css";

const BookList = ({ book, handleFavourite, isFavourite, handleOrder }) => {
  const bookImage = book.image === "" ? image : book.image;
  return (
    <Grid key={book.ISBN} item xs={12} md={2}>
      <Card className="bookDetails" sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={bookImage} />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <p>Author: {book.author}</p>
            <p>Release Date: {book.releaseDate}</p>
            <p>Donator Comment: {book.donatorcomment}</p>
            <p>Donate Date: {book.donateDate}</p>
            <p>Genre: {book.genre.genre}</p>
            <p>Donator: {book.donator.userName}</p>
            <p>Owner: {book.owner.userName}</p>
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button>
          <Button size="small">Learn More</Button> */}
          {isFavourite(book) ? (
            <Box sx={{ paddingLeft: "90px" }}>
              <Button
                size="small"
                variant="outlined"
                type="submit"
                className="button-order"
                onClick={() => {
                  handleOrder(book, book.favouritesId);
                }}
              >
                Order
              </Button>
              <IconButton
                onClick={(e) => {
                  e.target.value = "";
                  handleFavourite(book, book.favouritesId);
                }}
              >
                <FavoriteIcon sx={{ color: "green" }} />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ paddingLeft: "90px" }}>
              <IconButton
                onClick={(e) => {
                  e.target.value = "";
                  handleFavourite(book, book.favouritesId);
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BookList;
