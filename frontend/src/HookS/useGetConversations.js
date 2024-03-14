import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { authUser } = useAuthContext();
//  console.log("***useGetConversations*** =>",typeof (authUser.token) ,authUser.token);
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        /********************************************************* */
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWVhMjZhNjY3OWE0NDNjMGIwMTU2ODYiLCJpYXQiOjE3MDk4NDQxMzQsImV4cCI6MTcxMTE0MDEzNH0.6653ogQcrML3yzAlZND4vM2koCNiPPKQhMzwxu27TEY
        var myHeaders = new Headers();
        myHeaders.append("Authorization",`Bearer ${authUser.token}`);

        var raw = "";

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          // body: raw,
          redirect: "follow",
        };

        const res = await fetch(
          "http://localhost:5000/api/users",
          requestOptions
        )
          // .then((response) => response.text())
          // .then((result) => {
          //   // console.log("FETCH result => ", result);
          //   return result;
          // })
          // .catch((error) => console.log("error", error));
          
          // console.log(res);
          // JSON.parse(res)
        const data = await res.json() ;
       
        // console.log("await JSON.parse (res) => ", data);
        /********************************************************* */
        // const res = await fetch("http://localhost:8140/api/users");
        // const data = await res.json();
        // console.log("useGetConversations =>res => ", res);
        // console.log("useGetConversations =>data => ", data);

        if (data.error) {
          // console.log("Error From getConversations => ", data.error);
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        // console.log("Error From useGetConversations => ", error?.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
