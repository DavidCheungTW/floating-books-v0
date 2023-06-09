import axios from "axios";

export const AddBook = async (
  {
    title,
    isbn,
    author,
    releaseDate,
    image,
    donatorComment,
    donatorId,
    donateDate,
    ownerId,
    genreId,
  },
  userData
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("ISBN", isbn);
  formData.append("author", author);
  formData.append("releaseDate", releaseDate);
  formData.append("donatorcomment", donatorComment);
  formData.append("donateDate", donateDate);
  formData.append("genreId", genreId);
  formData.append("donatorId", donatorId);
  formData.append("ownerId", ownerId);
  if (image) {
    formData.append("image", image);
  } else {
    formData.append("image", "");
  }

  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/books`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/books`;
  }

  try {
    const token = userData.stsTokenManager.accessToken;
    axios.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    return await axios.post(endpoint, formData);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const GetRecentlyAddedBooks = async (setBooksData, setFilteredData) => {
  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/books`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/books`;
  }

  try {
    const result = await axios.get(endpoint);
    const bookData = result.data;
    bookData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setBooksData(bookData);
    setFilteredData(bookData);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const AddFavouriteBook = async (bookId, userId, createDate) => {
  const formData = {};
  formData.bookId = bookId;
  formData.userId = userId;
  formData.createDate = createDate;

  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/favourites`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/favourites`;
  }

  try {
    return await axios.post(endpoint, formData);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetFavouriteBook = async (userId, setFavouriteBooks) => {
  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/favourites/search`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/favourites/search`;
  }

  try {
    const formData = {};
    formData.userId = userId;
    const result = await axios.post(endpoint, formData);
    const uniqueBooksMap = new Map();
    result?.data.forEach((item) => {
      const data = { ...item.book, favouritesId: item.id };
      uniqueBooksMap.set(item.bookId, data);
    });

    setFavouriteBooks(Array.from(uniqueBooksMap.values()));
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const DeleteFavouriteBook = async (favouriteId) => {
  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/favourites/${favouriteId}`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/favourites/${favouriteId}`;
  }

  try {
    return await axios.delete(endpoint);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const AddOrderBook = async (bookId, userId, createDate, userData) => {
  const formData = {};
  formData.bookId = bookId;
  formData.userId = userId;
  formData.orderDate = createDate;

  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/orders`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/orders`;
  }

  try {
    const token = JSON.parse(userData).stsTokenManager.accessToken;
    axios.defaults.headers.post["Authorization"] = `Bearer ${token}`;
    return await axios.post(endpoint, formData).catch((error) => {
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else {
        console.error("Error:", error);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

export const GetOrderBooks = async (setOrderBooks, setErrorMessage) => {
  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/orders`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/orders`;
  }

  return axios
    .get(endpoint)
    .then((response) => {
      setOrderBooks(response.data);
      if (response.data.length === 0) {
        setErrorMessage("No Order book!");
      } else {
        setErrorMessage("");
      }
    })
    .catch(() => {
      setOrderBooks([]);
      setErrorMessage("Get error, please try again later!");
    });
};

export const UpdateOrder = async (orderId, newStatus, setErrorMessage) => {
  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/orders/${orderId}`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/orders/${orderId}`;
  }

  const formData = {};
  formData.status = newStatus;
  const currentDate = new Date();

  switch (newStatus) {
    case "reject":
    case "accept":
      formData.replyDate = currentDate.toDateString();
      break;
    case "delivered":
      formData.postDate = currentDate.toDateString();
      break;
    case "received":
      formData.compDate = currentDate.toDateString();
      break;
    default:
      break;
  }

  return axios
    .patch(endpoint, formData)
    .then((response) => {
      setErrorMessage("Status updated!");
    })
    .catch(() => {
      setErrorMessage("Get error, please try again later!");
    });
};

export const UpdateBook = (bookId, userId, setErrorMessage) => {
  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/books/${bookId}`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/books/${bookId}`;
  }

  const formData = {};
  formData.ownerId = userId;

  return axios
    .patch(endpoint, formData)
    .then(() => {
      setErrorMessage("Book owner is updated.");
    })
    .catch(() => {
      setErrorMessage("Server error. Please try again later.");
    });
};
