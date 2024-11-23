'use client';

import { Bungee_Shade } from '@next/font/google';
import { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { books } from '@/lib/books';

interface Book {
  title: string;
  author: string;
  isbn: string;
  year_read: number;
  rating: number;
  genre: string;
  cover_image?: string;
}

const bungeeShade = Bungee_Shade({ weight: "400", subsets: ["latin"] });

const Bookshelf = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const genres = ['All', ...Array.from(new Set(books.map((book) => book.genre)))];

  const filteredBooks = selectedGenre === 'All'
    ? books
    : books.filter((book) => book.genre.toLowerCase() === selectedGenre.toLowerCase());

  const booksByYear = filteredBooks.reduce<Record<number, Book[]>>((acc, book) => {
    if (!acc[book.year_read]) {
      acc[book.year_read] = [];
    }
    acc[book.year_read].push(book);
    return acc;
  }, {});

  const sortedYears = Object.keys(booksByYear)
    .map((year) => Number(year))
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen text-[#011627] relative">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className={`${bungeeShade.className} text-6xl sm:text-6xl font-bold text-center my-12 relative`}>
          <span className="absolute inset-0 text-[#011627] z-10">bookShelf</span>
          <span className="relative z-0 text-transparent" style={{ WebkitTextStroke: '2px #011627' }}>bookShelf</span>
        </h1>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className="text-[#b6244f] text-sm hover:text-[#c26a5c] cursor-pointer transition-colors duration-300"
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {sortedYears.map((year) => (
          <div key={year} className="mb-12">
            <h2 className="text-3xl font- mb-4">
              {year} <span className="text-xl font-normal text-gray-500">({booksByYear[year].length} {booksByYear[year].length > 1 ? 'books' : 'book'})</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {booksByYear[year].map((book, index) => (
                <Card key={`${book.isbn}-${index}`} className="flex flex-col items-center border-none shadow-none">
                  <CardContent className="flex-grow">
                    {book.cover_image ? (
                      <div className="w-40 h-60 relative mb-1">
                        <Image
                          src={book.cover_image}
                          alt={`Cover of ${book.title}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md shadow-md"
                        />
                      </div>
                    ) : (
                      <div className="w-40 h-60 bg-gray-300 flex items-center justify-center mb-1 rounded-md shadow-md">
                        <p className="text-gray-500">No cover</p>
                      </div>
                    )}
                  </CardContent>
                  <CardHeader className="p-0 mt-1">
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
    </div >
  );
};

export default Bookshelf;
