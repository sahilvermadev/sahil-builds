// scripts/fetch-notes.js

require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const GH_TOKEN = process.env.GH_TOKEN;

// Define repository details
const REPO_OWNER = 'sahilvermadev';
const REPO_NAME = 'obsidian-notes';
const CLONE_DEPTH = 1; // Shallow clone for efficiency

// Define paths
const TEMP_DIR = path.join(__dirname, 'temp-notes');
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const SOURCE_FOLDER = '5-Publish'; // Folder in the repo to move

if (!GH_TOKEN) {
  console.error('Error: GH_TOKEN is not set in your .env file.');// scripts/fetch-notes.js

  require('dotenv').config();
  const { execSync } = require('child_process');
  const path = require('path');
  const fs = require('fs');
  
  const GH_TOKEN = process.env.GH_TOKEN;
  
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
      execSync(`rm -rf ${TEMP_DIR}`, { stdio: 'inherit' });
    }
  
    // Clone the Obsidian notes repository using the GH_TOKEN
    const repoUrl = `https://${GH_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git`;
    console.log(`Cloning repository from ${repoUrl} into ${TEMP_DIR}...`);
    execSync(`git clone --depth=${CLONE_DEPTH} ${repoUrl} ${TEMP_DIR}`, { stdio: 'inherit' });
  
    // Check if the source folder exists in the cloned repo
    const sourcePath = path.join(TEMP_DIR, SOURCE_FOLDER);
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source folder "${SOURCE_FOLDER}" does not exist in the repository.`);
    }
  
    // Remove the existing content directory to prevent duplication
    if (fs.existsSync(CONTENT_DIR)) {
      console.log(`Removing existing content directory at ${CONTENT_DIR}...`);
      execSync(`rm -rf ${CONTENT_DIR}`, { stdio: 'inherit' });
    }
  
    // Move the source folder to the content directory
    console.log(`Moving "${SOURCE_FOLDER}" to "${CONTENT_DIR}"...`);
    execSync(`mv ${sourcePath} ${CONTENT_DIR}`, { stdio: 'inherit' });
  
    // Remove the temporary notes directory
    console.log('Cleaning up temporary directories...');
    execSync(`rm -rf ${TEMP_DIR}`, { stdio: 'inherit' });
  
    console.log('Obsidian notes fetched and integrated successfully!');
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    process.exit(1);
  }
  
  process.exit(1);
}

try {
  // Remove any existing temporary notes directory
  if (fs.existsSync(TEMP_DIR)) {
    console.log('Removing existing temporary directory...');
    execSync(`rm -rf ${TEMP_DIR}`, { stdio: 'inherit' });
  }

  // Clone the Obsidian notes repository using the GH_TOKEN
  const repoUrl = `https://${GH_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git`;
  console.log(`Cloning repository from ${repoUrl} into ${TEMP_DIR}...`);
  execSync(`git clone --depth=${CLONE_DEPTH} ${repoUrl} ${TEMP_DIR}`, { stdio: 'inherit' });

  // Check if the source folder exists in the cloned repo
  const sourcePath = path.join(TEMP_DIR, SOURCE_FOLDER);
  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source folder "${SOURCE_FOLDER}" does not exist in the repository.`);
  }

  // Remove the existing content directory to prevent duplication
  if (fs.existsSync(CONTENT_DIR)) {
    console.log(`Removing existing content directory at ${CONTENT_DIR}...`);
    execSync(`rm -rf ${CONTENT_DIR}`, { stdio: 'inherit' });
  }

  // Move the source folder to the content directory
  console.log(`Moving "${SOURCE_FOLDER}" to "${CONTENT_DIR}"...`);
  execSync(`mv ${sourcePath} ${CONTENT_DIR}`, { stdio: 'inherit' });

  // Remove the temporary notes directory
  console.log('Cleaning up temporary directories...');
  execSync(`rm -rf ${TEMP_DIR}`, { stdio: 'inherit' });

  console.log('Obsidian notes fetched and integrated successfully!');
} catch (error) {
  console.error('Error fetching notes:', error.message);
  process.exit(1);
}

// execSync(`git clone --depth=${CLONE_DEPTH} --filter=blob:none --sparse ${repoUrl} ${TEMP_DIR}`, { stdio: 'inherit' });
// execSync(`git -C ${TEMP_DIR} sparse-checkout set ${SOURCE_FOLDER}`, { stdio: 'inherit' });