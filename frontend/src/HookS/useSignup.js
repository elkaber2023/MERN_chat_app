import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    // Function Check Validate Fields
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    //***************************************/
    if (!success) return;

    setLoading(true);

    // Connection Api and Send Post Request
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // AccessControlAllowPrivateNetwork: true,
        },

        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      // return data from request
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      console.log("Data From res in Hooks => ", data);
    } catch (error) {
      console.log("Catch Error From useSignup: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup }; // data && loading => status false/true
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields...");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password do not match...");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be least 6 characters...");
    return false;
  }
  return true;
}
