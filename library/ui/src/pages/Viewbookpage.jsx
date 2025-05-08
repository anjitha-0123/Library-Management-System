import React from "react";
import { useLocation } from "react-router-dom";
import ViewBook from "../Components/ViewBook";

const ViewBookPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const bookname = query.get("bookname");

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Book Details</h1>
      <ViewBook bookname={bookname} />
    </div>
  );
};

export default ViewBookPage;
