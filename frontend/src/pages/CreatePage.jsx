import React, { useState } from 'react'
import { Link } from 'react-router';
import { ArrowLeftIcon, Target } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { useNavigate } from 'react-router';

const CreatePage = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("All Fields are required");
      return
    }

    setLoading(true);
    try {
      await api.post("/notes", {
        title, content
      })
      toast.success("Note Created Successfully");
      navigate('/');
    } catch (error) {
     if(error.response.status === 429) {
     toast.error("Slow Down!", {
      duration: 4000,
      icon: '⚠️'
     });
     } else {
      toast.error("Failed to create note");
     }
      
    } finally {
      setLoading(false);
    }

  }

  return (
 
 <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
  <div className="container mx-auto px-6 py-12">
    <div className="max-w-2xl mx-auto">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-300 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back to Notes</span>
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all duration-300">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">📝 Create New Note</h2>
        <form onSubmit={handleSubmit}>
          {/* Title Field */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter a note title"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Content Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
            </label>
            <textarea
              placeholder="Write your note here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

  )
}

export default CreatePage