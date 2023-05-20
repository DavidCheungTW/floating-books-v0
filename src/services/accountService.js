import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
  deleteUser,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const Register = async ({
  firstName,
  lastName,
  email,
  password,
  userName,
  postalAddress,
}) => {
  const formData = {};
  formData.firstName = firstName;
  formData.lastName = lastName;
  formData.userName = userName;
  formData.postalAddress = postalAddress;
  formData.email = email;

  const endpoint = "http://localhost:4000/users";
  try {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result?.user) {
          const currentUser = auth.currentUser;
          return updateProfile(currentUser, { displayName: userName })
            .then(async () => {
              try {
                return await axios.post(endpoint, formData).catch((error) => {
                  console.error("Axios Error:", error);
                  // === begin : remove firebase account
                  const auth = getAuth();
                  deleteUser(auth.currentUser).catch((error) => {
                    console.error("Delete user Error:", error);
                  });
                  // === end : remove firebase account
                  signOut(auth); // sign out until email verified
                  console.error("Add user record Error:", error);
                });
              } catch (error) {
                signOut(auth); // sign out until email verified
                console.error("Add user record Error:", error);
              }
            })
            .catch((error) => {
              // === begin : remove firebase account
              const auth = getAuth();
              deleteUser(auth.currentUser).catch((error) => {
                console.error("Delete user Error:", error);
              });
              // === end : remove firebase account
              signOut(auth); // sign out until email verified
              console.error("updateProfile Error:", error);
            });
        } else {
          console.error("Error: result?user");
        }
      })
      .catch((error) => {
        console.error("createUserWithEmailAndPassword Error:", error);
      });
  } catch (error) {
    console.error("Overall Error:", error);
  }
};

export const Login = async ({ email, password }) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const GetUserDetails = async (userData, setUserDetails) => {
  const data = JSON.parse(userData);
  const userName = data?.providerData[0].displayName;
  const formData = {};
  formData.userName = userName;

  if (data?.providerData) {
    const endpoint = "http://localhost:4000/users/search";
    try {
      return await axios.post(endpoint, formData).then((res) => {
        setUserDetails(...res.data);
        return res;
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
