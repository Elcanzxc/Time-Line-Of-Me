import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Book } from '../../types/Book.js';
import { useLibrary } from '../../context/LibraryContext.js';
import { StarRating } from '../ui/StartRating.js';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants.js';

interface BookFormProps {
  book?: Book;
  onClose: () => void;
  mode?: 'add' | 'edit';
}

export const BookForm: React.FC<BookFormProps> = ({ book, onClose, mode = 'add' }) => {
 const { addBook, updateBook, seedBooks, loading: isLibraryLoading } = useLibrary();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    description: book?.description || '',
    publishedDate: book?.publishedDate.split('T')[0] || '',
    coverUrl: book?.coverUrl || '',
    rating: book?.rating || 0,
  });

  const handleSubmit = async () => {
    if (!formData.title || !formData.author || !formData.description || !formData.publishedDate) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookData = {
        ...formData,
        publishedDate: new Date(formData.publishedDate).toISOString(),
      };

      if (mode === 'edit' && book) {
        await updateBook(book.id, bookData);
      } else {
        await addBook(bookData);
        navigate(ROUTES.HOME);
      }
      onClose();
    } catch (error) {
      alert(`Failed to ${mode === 'edit' ? 'update' : 'add'} book. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-charcoal rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        <div className="sticky top-0 bg-charcoal border-b border-gray-800 p-6 z-10">
         
         
<div className="flex items-center justify-between">
  <div>
    <h2 className="font-serif text-3xl text-ivory">
      {mode === 'edit' ? 'Edit Book' : 'Add New Book'}
    </h2>
    {/* ДОБАВЛЯЕМ ЭТУ КНОПКУ ТОЛЬКО ДЛЯ РЕЖИМА "ADD" */}
    {mode === 'add' && (
      <button
        onClick={(e) => {
          e.preventDefault();
          seedBooks();
        }}
        disabled={isLibraryLoading}
        className="mt-2 text-xs bg-amber-600/20 hover:bg-amber-600/40 text-amber-400 border border-amber-600/50 px-3 py-1 rounded-full transition-all"
      >
        {isLibraryLoading ? '🪄 Magic in progress...' : '✨ Auto-fill 5 books via API'}
      </button>
    )}
  </div>
  <button
    onClick={onClose}
    className="p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-all"
  >
    <X size={24} />
  </button>
</div>


        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Author *</label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
              placeholder="Enter author name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all resize-none"
              placeholder="Enter book description"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Published Date *
              </label>
              <input
                type="date"
                required
                value={formData.publishedDate}
                onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
              <div className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg">
                <StarRating
                  rating={formData.rating}
                  onRate={(rating) => setFormData({ ...formData, rating })}
                  size={24}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Cover Image URL</label>
            <input
              type="url"
              value={formData.coverUrl}
              onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-ivory focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent transition-all"
              placeholder="https://example.com/cover.jpg (optional)"
            />
            <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate a cover image</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-amber-700 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium shadow-lg shadow-amber-900/30 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};