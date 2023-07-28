import React from "react";
import useFetch from "./useFetch";

const MyComponent = () => {
  const url = `https://mail-box-39d58-default-rtdb.asia-southeast1.firebasedatabase.app/Mails/${String(
    localStorage.getItem("email")
  )}/inbox.json`;
  const data = useFetch(url);
  console.log(data);
  return (
    <div>
      <h1>this is custom hook</h1>
    </div>
  );
};

export default MyComponent;
