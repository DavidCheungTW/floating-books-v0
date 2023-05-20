import axios from "axios";

export const GetGenres = async (setGenreList) => {
  const host = window.location.hostname;
  let endpoint = `http://${host}:4000/genres`;
  if (process.env.REACT_APP_BASE_URL) {
    endpoint = `${process.env.REACT_APP_BASE_URL}/genres`;
  }

  try {
    return await axios.get(endpoint).then((res) => {
      setGenreList(res.data);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
