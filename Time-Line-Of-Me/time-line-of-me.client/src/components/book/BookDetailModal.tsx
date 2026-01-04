import React, { useState } from 'react';
import { X, Edit2, Trash2, Calendar, User, FileText } from 'lucide-react';
import type { Book } from '../../types/Book.js';
import { useLibrary } from '../../context/LibraryContext.js';
import { StarRating } from '../ui/StartRating.js';
import { BookForm } from './BookForm.js';

interface BookDetailModalProps {
  book: Book;
  onClose: () => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose }) => {
  const { deleteBook } = useLibrary();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(book.id);
        onClose();
      } catch (error) {
        alert('Failed to delete book. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-charcoal rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-900/80 hover:bg-gray-800 text-gray-400 hover:text-white transition-all backdrop-blur-sm"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-5 gap-8 p-8">
          <div className="md:col-span-2">
            <div className="sticky top-8">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-amber-700/20 hover:bg-amber-700/30 text-amber-400 rounded-lg transition-colors border border-amber-700/30"
                >
                  <Edit2 size={18} />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors border border-red-900/30"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <div>
              <h1 className="font-serif text-4xl md:text-5xl text-ivory mb-2 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-gray-400 flex items-center gap-2">
                <User size={18} />
                {book.author}
              </p>
            </div>

            <div className="flex items-center gap-6 py-4 border-y border-gray-800">
              <div>
                <p className="text-sm text-gray-500 mb-1">Rating</p>
                <StarRating rating={book.rating || 0} size={24} readonly />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Published</p>
                <p className="text-ivory flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(book.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ivory mb-3 flex items-center gap-2">
                <FileText size={24} />
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">{book.description}</p>
            </div>
          </div>
        </div>
      </div>

      {isEditing && <BookForm book={book} onClose={() => setIsEditing(false)} mode="edit" />}
    </div>
  );
};