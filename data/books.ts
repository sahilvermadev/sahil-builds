// data/books.ts

import { Book } from '@/components/Bookshelf/Bookshelf';

export const books: Book[] = [
  {
    id: '1',
    title: 'Coda',
    author: 'Spurrier, Bergara',
    coverImage: '/covers/coda.jpg', // Ensure this image exists in public/covers/
    rating: 4,
    genre: 'Graphic Novel',
    year: 2024,
  },
  {
    id: '2',
    title: 'The Anxious Generation',
    author: 'Jonathan Haidt',
    coverImage: '/covers/the-anxious-generation.jpg',
    rating: 5,
    genre: 'Psychology',
    year: 2024,
  },
  // Add more books as needed...
];
