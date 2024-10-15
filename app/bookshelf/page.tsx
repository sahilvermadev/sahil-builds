'use client';

import { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

// Import books data
import { books } from '@/data/books';

// Define the Book type that matches the data in books.ts
interface Book {
  title: string;
  author: string;
  isbn: string;
  year_read: number;
  rating: number;
  genre: string;
  cover_image?: string;
}

const Bookshelf = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // Extract genres dynamically from the books data
  const genres = ['All', ...Array.from(new Set(books.map((book) => book.genre)))];

  // Filter books based on selected genre
  const filteredBooks = selectedGenre === 'All'
    ? books
    : books.filter((book) => book.genre.toLowerCase() === selectedGenre.toLowerCase());

  // Group books by year read
  const booksByYear = filteredBooks.reduce<Record<number, Book[]>>((acc, book) => {
    if (!acc[book.year_read]) {
      acc[book.year_read] = [];
    }
    acc[book.year_read].push(book);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(booksByYear)
    .map((year) => Number(year))
    .sort((a, b) => b - a);

  return (
    <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-8xl m:text-9xl font-bold text-center my-12 relative">
          <span className="absolute inset-0 text-[#d47d6f] z-10">bookShelf</span>
          <span className="relative z-0 text-transparent" style={{ WebkitTextStroke: '2px #8b4c45' }}>bookShelf</span>
        </h1>

      {/* Genre Filter - Unchanged as per request */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className="text-[#d47d6f] text-sm hover:text-[#c26a5c] cursor-pointer transition-colors duration-300"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grouped by Year */}
      {sortedYears.map((year) => (
        <div key={year} className="mb-12">
          <h2 className="text-4xl font-bold mb-4">
            {year} <span className="text-xl font-normal text-gray-500">({booksByYear[year].length} {booksByYear[year].length > 1 ? 'books' : 'book'})</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {booksByYear[year].map((book, index) => (
              <Card key={`${book.isbn}-${index}`} className="flex flex-col items-center border-none shadow-none">
                <CardContent className="flex-grow">
                  {book.cover_image ? (
                    <div className="w-40 h-60 relative mb-2">
                      <Image
                        src={book.cover_image}
                        alt={`Cover of ${book.title}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md shadow-md"
                      />
                    </div>
                  ) : (
                    <div className="w-40 h-60 bg-gray-300 flex items-center justify-center mb-2 rounded-md shadow-md">
                      <p className="text-gray-500">No cover</p>
                    </div>
                  )}
                </CardContent>
                <CardHeader className="p-0 mt-2">
                  <CardTitle className="text-sm font-semibold text-center">{book.title}</CardTitle>
                  <CardDescription className="text-xs text-center">{book.author}</CardDescription>
                </CardHeader>
                <CardFooter className="p-0 mt-1">
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-3 h-3 ${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookshelf;