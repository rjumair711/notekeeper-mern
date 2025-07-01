import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimiting from '../components/RateLimiting';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NoteNotFound from '../components/NoteNotFound';

const HomePage = () => {

  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes", {
          withCredentials: true,
        })
        console.log(response.data);
        setNotes(response.data);
        setRateLimited(false);

      } catch (error) {
        console.log("Error fetching note");
        if (error.response?.status === 429) {
          setRateLimited(true)
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />
      {isRateLimited && <RateLimiting />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Notes...</div>}
        {notes.length === 0 &&  !isRateLimited && < NoteNotFound />}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>

  )
}

export default HomePage