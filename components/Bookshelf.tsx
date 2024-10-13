'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

interface Book {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  imageLinks: {
    thumbnail: string;
  };
}

const Bookshelf = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <Card key={book.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
            <CardDescription>{book.authors.join(', ')}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Image
              src={book.imageLinks.thumbnail}
              alt={`Cover of ${book.title}`}
              width={128}
              height={192}
              className="mx-auto mb-4"
            />
            <p className="text-sm line-clamp-3">{book.description}</p>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-gray-500">Published: {book.publishedDate}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Bookshelf;