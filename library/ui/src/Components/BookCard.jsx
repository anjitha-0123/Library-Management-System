import React from "react";

const BookCard = ({ book }) => {
  if (!book) {
    return <p>No book details available.</p>;
  }

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white w-80 text-center">
      {/* Book Image */}
      {book.image ? (
        <img
          src={book.image}
          alt={book.bookname}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}

      {/* Book Details */}
      <h2 className="text-xl font-bold mb-2">{book.bookname}</h2>
      <p className="text-gray-600"><strong>Author:</strong> {book.author || "Unknown"}</p>
      <p className="text-gray-600"><strong>Published:</strong> {book.published || "N/A"}</p>
      <p className="text-gray-600"><strong>Description:</strong> {book.description || "No description available"}</p>
    </div>
  );
};

export default BookCard;
