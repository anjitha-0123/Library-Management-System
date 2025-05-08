import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

function AddBook() {
  const [bookname, setBookname] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publishdate, setPublishdate] = useState('');
  const [noofcopy, setNoofcopy] = useState('');
  const [bookImage, setBookImage] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setBookImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('Bookname', bookname);
    formData.append('Author', author);
    formData.append('Genre', genre);
    formData.append('Publishdate', publishdate);
    formData.append('Noofcopy', noofcopy);
    if (bookImage) {
      formData.append('BookImage', bookImage);
    }

    try {
      const response = await fetch('/api/addBook', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      alert('Book added successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='bg-gray-900 min-h-screen flex flex-col items-center'>
      <Navbar />
      <div className='bg-white w-full mt-2 h-4'></div>
      <form onSubmit={handleSubmit} className='bg-neutral-100 mt-6  p-6 w-[600px] rounded-lg shadow-lg'>
        <h2 className='text-3xl font-semibold text-center mb-4'>Add Book</h2>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        
        <label className='block font-semibold'>Book Name:</label>
        <input type='text' className='w-full p-2 border' value={bookname} onChange={(e) => setBookname(e.target.value)} required />

        <label className='block font-semibold mt-2'>Author:</label>
        <input type='text' className='w-full p-2 border' value={author} onChange={(e) => setAuthor(e.target.value)} required />

        <label className='block font-semibold mt-2'>Genre:</label>
        <input type='text' className='w-full p-2 border' value={genre} onChange={(e) => setGenre(e.target.value)} required />

        <label className='block font-semibold mt-2'>Publication Date:</label>
        <input type='date' className='w-full p-2 border' value={publishdate} onChange={(e) => setPublishdate(e.target.value)} required />

        <label className='block font-semibold mt-2'>Number of Copies:</label>
        <input type='number' className='w-full p-2 border' value={noofcopy} onChange={(e) => setNoofcopy(e.target.value)} required />

        <label className='block font-semibold mt-2'>Book Image:</label>
        <input type='file' className='w-full p-2 border' onChange={handleImageChange} accept='image/*' />

        <button type='submit' className='bg-black text-white w-full p-3 rounded-lg mt-4 hover:bg-gray-800'>Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
