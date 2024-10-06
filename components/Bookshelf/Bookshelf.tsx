// components/Bookshelf/Bookshelf.tsx
'use client'; // <-- Add this directive

import { useState } from 'react';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';

// Define the Book type
type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  rating: number;
  genre: string;
  year: number;
};

// Import books data
import { books } from '@/data/books';

// Define genres
const genres = [
  'All',
  'Biography',
  'Business',
  'Climate Change',
  'Fantasy',
  'Graphic Novel',
  'Politics',
  'Pop-sci',
  'Sci-fi',
  'Social Justice',
  'Technology',
];

export default function Bookshelf() {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // Filter books based on selected genre
  const filteredBooks = selectedGenre === 'All'
    ? books
    : books.filter(book => book.genre === selectedGenre);

  // Group books by year
  const booksByYear = filteredBooks.reduce<Record<number, Book[]>>((acc, book) => {
    if (!acc[book.year]) {
      acc[book.year] = [];
    }
    acc[book.year].push(book);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(booksByYear)
    .map(year => Number(year))
    .sort((a, b) => b - a);

  return (
    <div className="container mx-auto px-4">
        <h1 className="text-8xl m:text-9xl font-bold text-center my-12 relative">
          <span className="absolute inset-0 text-[#d47d6f] z-10">bookShelf</span>
          <span className="relative z-0 text-transparent" style={{ WebkitTextStroke: '2px #8b4c45' }}>bookShelf</span>
        </h1>
      {/* Genre Filter */}
      <div className="mb-8">
        <p className="text-lg mb-2 text-center">Filter by Genre:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1 rounded-full text-sm transition-colors duration-300 ${
                selectedGenre === genre
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grouped by Year */}
      {sortedYears.map(year => (
        <div key={year} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            {year} <span className="text-sm font-normal text-gray-500">({booksByYear[year].length} {booksByYear[year].length > 1 ? 'books' : 'book'})</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {booksByYear[year].map(book => (
              <div key={book.id} className="flex flex-col items-center">
                <div className="w-40 h-60 relative mb-2">
                  <Image
                    src={book.coverImage}
                    alt={`Cover of ${book.title}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md shadow-md"
                  />
                </div>
                <h3 className="font-semibold text-lg text-center line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600 text-center">{book.author}</p>
                {book.rating > 0 && (
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
