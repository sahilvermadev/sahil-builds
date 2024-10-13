// scripts/fetch-books.js

require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const yaml = require('js-yaml');

const GH_TOKEN = process.env.GH_TOKEN;
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// Define repository details
const REPO_OWNER = 'sahilvermadev';
const REPO_NAME = 'obsidian-notes';
const CLONE_DEPTH = 1; // Shallow clone for efficiency

// Define paths
const TEMP_DIR = path.join(__dirname, 'temp-repo');
const DATA_DIR = path.join(__dirname, '..', 'data');
const BOOKS_FILE = path.join(DATA_DIR, 'books.ts');
const COVERS_DIR = path.join(__dirname, '..', 'public', 'covers');
const SOURCE_FOLDER = '6-Books.md';

// Ensure COVERS_DIR and DATA_DIR exist
if (!fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!GH_TOKEN) {
    console.error('Error: GH_TOKEN is not set in your .env file.');
    process.exit(1);
}

if (!GOOGLE_BOOKS_API_KEY) {
    console.error('Error: GOOGLE_BOOKS_API_KEY is not set in your .env file.');
    process.exit(1);
}

(async () => {
    try {
        // Remove any existing temporary repository
        if (fs.existsSync(TEMP_DIR)) {
            console.log('Removing existing temporary repository...');
            execSync(`rm -rf ${TEMP_DIR}`, { stdio: 'inherit' });
        }

        // Clone the repository
        const repoUrl = `https://${GH_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git`;
        console.log(`Cloning repository from ${repoUrl} into ${TEMP_DIR}...`);
        execSync(`git clone --depth=${CLONE_DEPTH} ${repoUrl} ${TEMP_DIR}`, { stdio: 'inherit' });

        // Path to the books data file in the cloned repo
        const clonedBooksFile = path.join(TEMP_DIR, SOURCE_FOLDER);

        if (!fs.existsSync(clonedBooksFile)) {
            throw new Error(`Books data file not found at ${clonedBooksFile}`);
        }

        // Read the Markdown file content
        const fileContents = fs.readFileSync(clonedBooksFile, 'utf8');

        // Remove code block if present and extract YAML content
        const yamlContentMatch = fileContents.match(/```[\s\S]*?---\n([\s\S]*?)\n---[\s\S]*?```/);
        if (!yamlContentMatch) {
            throw new Error('No YAML front matter found in the Markdown file.');
        }

        const yamlContent = yamlContentMatch[1];
        const booksData = yaml.load(yamlContent);

        if (!Array.isArray(booksData)) {
            throw new Error('Books data file format is incorrect. Expected an array of books.');
        }

        const updatedBooks = [];

        // Process each book
        for (let book of booksData) {
            const { title, author, isbn, year_read, rating, genre } = book;

            if (!isbn) {
                console.warn(`Warning: Book "${title}" by ${author} does not have an ISBN. Skipping cover fetch.`);
                updatedBooks.push(book);
                continue;
            }

            // Fetch book details from Google Books API
            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${GOOGLE_BOOKS_API_KEY}`;

            console.log(`Fetching cover for "${title}" by ${author} (ISBN: ${isbn})...`);

            try {
                const response = await axios.get(apiUrl);
                const items = response.data.items;

                if (!items || items.length === 0) {
                    console.warn(`Warning: No data found for ISBN ${isbn}.`);
                    updatedBooks.push(book);
                    continue;
                }

                const bookInfo = items[0].volumeInfo;
                const thumbnail = bookInfo.imageLinks?.thumbnail || '';

                if (!thumbnail) {
                    console.warn(`Warning: No cover image found for ISBN ${isbn}.`);
                    updatedBooks.push(book);
                    continue;
                }

                // Construct the cover image filename
                const coverFilename = `${isbn}.jpg`;
                const coverPath = path.join(COVERS_DIR, coverFilename);

                // Check if the cover already exists
                if (fs.existsSync(coverPath)) {
                    console.log(`Cover for ISBN ${isbn} already exists. Skipping download.`);
                } else {
                    // Download the cover image
                    const imageResponse = await axios.get(thumbnail, { responseType: 'stream' });

                    const writer = fs.createWriteStream(coverPath);

                    imageResponse.data.pipe(writer);

                    await new Promise((resolve, reject) => {
                        writer.on('finish', resolve);
                        writer.on('error', reject);
                    });

                    console.log(`Downloaded cover image to ${coverPath}`);
                }

                // Update the book entry to use the local cover image
                updatedBooks.push({
                    ...book,
                    cover_image: `/covers/${coverFilename}`,
                });
            } catch (error) {
                console.error(`Error fetching cover for ISBN ${isbn}:`, error.message);
                updatedBooks.push(book);
                continue;
            }
        }

        // Generate TypeScript data file
        const booksDataTs = `export const books = ${JSON.stringify(updatedBooks, null, 2)};\n`;
        fs.writeFileSync(BOOKS_FILE, booksDataTs, 'utf8');
        console.log(`Updated books data saved to ${BOOKS_FILE}`);

        // Clean up temporary repository
        console.log('Cleaning up temporary repository...');
        execSync(`rm -rf ${TEMP_DIR}`, { stdio: 'inherit' });
        console.log('Fetch and update process completed successfully!');
    } catch (error) {
        console.error('Error during fetch and update process:', error.message);
        process.exit(1);
    }
})();
