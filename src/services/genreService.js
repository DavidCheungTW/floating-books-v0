import axios from "axios";

export const GetGenres = async (setGenreList) => {
  const endpoint = "http://localhost:4000/genres";

  try {
    return await axios.get(endpoint).then((res) => {
      setGenreList(res.data);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};
