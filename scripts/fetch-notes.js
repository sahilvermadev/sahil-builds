// scripts/fetch-notes.js


require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const GH_TOKEN = process.env.GH_TOKEN;
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;


// Define repository details
const REPO_OWNER = 'sahilvermadev';
const REPO_NAME = 'obsidian-notes';
const CLONE_DEPTH = 1; // Shallow clone for efficiency

// Define paths
const TEMP_DIR = path.join(__dirname, 'temp-notes');
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const SOURCE_FOLDER = '5-Publish'; // Folder in the repo to move

if (!GH_TOKEN) {
  console.error('Error: GH_TOKEN is not set in your .env file.');
  process.exit(1);
}

try {
  // Remove any existing temporary notes directory
  if (fs.existsSync(TEMP_DIR)) {
    console.log('Removing existing temporary directory...');
    execSync(`rm -rf "${TEMP_DIR}"`, { stdio: 'inherit' });
  }

  // Clone the Obsidian notes repository using the GH_TOKEN
  const repoUrl = `https://${GH_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git`;
  console.log(`Cloning repository from ${repoUrl} into ${TEMP_DIR}...`);
  execSync(`git clone --depth=${CLONE_DEPTH} "${repoUrl}" "${TEMP_DIR}"`, { stdio: 'inherit' });

  // Check if the source folder exists in the cloned repo
  const sourcePath = path.join(TEMP_DIR, SOURCE_FOLDER);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source folder "${SOURCE_FOLDER}" does not exist in the repository.`);
  }

  // Function to recursively rename files and directories to replace spaces with dashes
  function renameFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const oldPath = path.join(dirPath, file);
      const stats = fs.statSync(oldPath);

      // Replace spaces with dashes in the file/directory name
      const newFile = file.replace(/ /g, '-');
      const newPath = path.join(dirPath, newFile);

      // If the name has changed, rename the file/directory
      if (oldPath !== newPath) {
        console.log(`Renaming: "${oldPath}" -> "${newPath}"`);
        fs.renameSync(oldPath, newPath);
      }

      // If it's a directory, recurse into it
      if (stats.isDirectory()) {
        renameFiles(newPath);
      }
    }
  }

  // Rename files and directories in the source path
  console.log(`Renaming files in "${sourcePath}" to replace spaces with dashes...`);
  renameFiles(sourcePath);

  // Remove the existing content directory to prevent duplication
  if (fs.existsSync(CONTENT_DIR)) {
    console.log(`Removing existing content directory at "${CONTENT_DIR}"...`);
    execSync(`rm -rf "${CONTENT_DIR}"`, { stdio: 'inherit' });
  }

  // Move the source folder to the content directory
  console.log(`Moving "${SOURCE_FOLDER}" to "${CONTENT_DIR}"...`);
  fs.renameSync(sourcePath, CONTENT_DIR);

  // Remove the temporary notes directory
  console.log('Cleaning up temporary directories...');
  execSync(`rm -rf "${TEMP_DIR}"`, { stdio: 'inherit' });

  console.log('Obsidian notes fetched and integrated successfully!');
} catch (error) {
  console.error('Error fetching notes:', error.message);
  process.exit(1);
}