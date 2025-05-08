// import React, { useEffect, useState } from "react";
// import BookCard from "./Bookcard";

// const ViewBook = ({ bookname }) => {
//   const [book, setBook] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await fetch(`/viewbook?bookname=${bookname}`);
//         const data = await response.json();
//         if (response.ok) {
//           setBook(data.data);
//         } else {
//           setError(data.msg);
//         }
//       } catch (err) {
//         setError("Failed to fetch book details");
//       }
//     };

//     if (bookname) {
//       fetchBook();
//     }
//   }, [bookname]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       {error ? <p className="text-red-500">{error}</p> : <BookCard book={book} />}
//     </div>
//   );
// };

// export default ViewBook;



import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const ViewBook = ({ bookname }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const url = bookname ? `/viewbook?bookname=${bookname}` : "/viewbooks";
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setBooks(bookname ? [data.data] : data.data); // Convert to array if fetching a single book
        } else {
          setError(data.msg);
        }
      } catch (err) {
        setError("Failed to fetch books");
      }
    };

    fetchBooks();
  }, [bookname]);

  return (
    <div className="flex flex-col items-center">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewBook;
