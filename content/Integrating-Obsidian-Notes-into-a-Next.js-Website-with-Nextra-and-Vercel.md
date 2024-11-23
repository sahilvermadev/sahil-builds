---
title: Untitled 3
date: 2024-09-15
description: 
tags:
---


# **Project Documentation**

## **Integrating Obsidian Notes into a Next.js Website with Nextra and Vercel**

---

## **Table of Contents**

1. [Introduction](#introduction)
2. [Project Overview](#project-overview)
3. [Prerequisites](#prerequisites)
4. [Setting Up the Obsidian Notes Repository](#setting-up-the-obsidian-notes-repository)
5. [Creating the Next.js Project with Nextra](#creating-the-nextjs-project-with-nextra)
6. [Configuring the Build Process](#configuring-the-build-process)
    - [Fetch Notes During Build](#fetch-notes-during-build)
    - [Using Environment Variables with dotenv](#using-environment-variables-with-dotenv)
7. [Setting Up Obsidian for Front Matter](#setting-up-obsidian-for-front-matter)
    - [Using the Templater Plugin](#using-the-templater-plugin)
8. [Handling Obsidian-Specific Syntax](#handling-obsidian-specific-syntax)
9. [Generating RSS Feed](#generating-rss-feed)
10. [Adjusting Next.js Configuration](#adjusting-nextjs-configuration)
11. [Troubleshooting](#troubleshooting)
12. [Best Practices](#best-practices)
13. [Deployment to Vercel](#deployment-to-vercel)
14. [Summary](#summary)
15. [Appendix](#appendix)
    - [Sample Files and Configurations](#sample-files-and-configurations)
    - [Common Errors and Solutions](#common-errors-and-solutions)

---

## **Introduction**

This documentation provides a comprehensive guide to integrating your Obsidian notes into a Next.js website using Nextra and deploying it on Vercel. By following this guide, you will set up an automated process where your Obsidian notes are fetched during the build process and displayed on your website.

---

## **Project Overview**

- **Goal**: Integrate Obsidian notes from a private GitHub repository into a Next.js website.
- **Technologies Used**:
    - **Obsidian**: A powerful knowledge base that works on top of a local folder of plain text Markdown files.
    - **Next.js**: A React framework for production.
    - **Nextra**: A Next.js static site generator.
    - **Vercel**: A platform for frontend frameworks and static sites.
    - **GitHub**: Hosting code and managing repositories.
    - **dotenv**: Module to load environment variables.

---

## **Prerequisites**

- **Basic Knowledge** of JavaScript, Node.js, and Git.
- **GitHub Account** with repositories for your Obsidian notes and website.
- **Node.js and npm** installed on your machine.
- **Obsidian** installed and set up.
- **Vercel Account** for deployment.

---

## **Setting Up the Obsidian Notes Repository**

1. **Create a Private Repository** on GitHub for your Obsidian notes (e.g., `obsidian-notes`).
    
2. **Organize Your Notes**:
    
    - Place the notes you want to publish in a folder named `5-Publish` within your Obsidian vault.
3. **Push Your Notes** to the GitHub repository:
    
    - Initialize a Git repository in your Obsidian vault if you haven't already.
    - Commit and push your notes to the `obsidian-notes` repository.

---

## **Creating the Next.js Project with Nextra**

1. **Initialize a New Next.js Project**:
    
    bash
    
    Copy code
    
    `npx create-next-app@latest your-website`
    
2. **Navigate to the Project Directory**:
    
    bash
    
    Copy code
    
    `cd your-website`
    
3. **Install Nextra and Related Dependencies**:
    
    bash
    
    Copy code
    
    `npm install nextra nextra-theme-blog remark-obsidian`
    
4. **Set Up Nextra**:
    
    - **Create `next.config.js`**:

```
// next.config.js
const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.js',
  mdxOptions: {
    remarkPlugins: [
      [
        require('remark-obsidian'),
        {
          useMarkdownLinks: true,
          wikiLinkClassName: 'internal-link',
          internalLinkPrefix: '/posts/',
        },
      ],
    ],
  },
});

module.exports = withNextra({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

```

5.  **Create `theme.config.js`** (basic setup):

```
// theme.config.js
export default {
  siteName: 'Your Site Name',
  // Other configurations...
};

```
---

## **Configuring the Build Process**

### **Fetch Notes During Build**

1. **Install dotenv**:
    
    bash
    
    Copy code
    
    `npm install dotenv`
    
2. **Create a `.env` File** in the root of your project:
    
    env
    
    Copy code
    
    `GH_TOKEN=your_personal_access_token`
    
    **Note**: Replace `your_personal_access_token` with your actual GitHub Personal Access Token (PAT). Ensure the `.env` file is included in your `.gitignore` to prevent it from being committed.
    
3. **Add `.env` to `.gitignore`**:
    
    gitignore
    
    Copy code
    
    `# .gitignore .env`
    
4. **Create `scripts/fetch-notes.js`**:
```
// scripts/fetch-notes.js
require('dotenv').config();
const { execSync } = require('child_process');

const GH_TOKEN = process.env.GH_TOKEN;

if (!GH_TOKEN) {
  console.error('Error: GH_TOKEN is not set.');
  process.exit(1);
}

try {
  execSync('rm -rf temp-notes', { stdio: 'inherit' });
  execSync(`git clone --depth=1 https://${GH_TOKEN}@github.com/your-username/obsidian-notes.git temp-notes`, { stdio: 'inherit' });
  execSync('rm -rf pages/posts', { stdio: 'inherit' });
  execSync('mv temp-notes/5-Publish pages/posts', { stdio: 'inherit' });
  execSync('rm -rf temp-notes', { stdio: 'inherit' });
} catch (error) {
  console.error('Error fetching notes:', error.message);
  process.exit(1);
}

```
    
    **Note**: Replace `your-username` with your GitHub username.
    
5. **Update `package.json` Scripts**:
```
{
  "scripts": {
    "dev": "npm run fetch-notes && next",
    "fetch-notes": "node scripts/fetch-notes.js",
    "build": "npm run fetch-notes && node ./scripts/gen-rss.js && next build",
    "start": "next start"
  },
  "dependencies": {
    "dotenv": "^16.3.1",
    "gray-matter": "^4.0.3",
    "next": "^13.5.6",
    "nextra": "^2.13.2",
    "nextra-theme-blog": "^2.13.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "remark-obsidian": "^1.8.0",
    "rss": "^1.2.2"
  }
  // ... rest of your package.json
}
```
### **Using Environment Variables with dotenv**

- **Ensure `dotenv` is Required** in any scripts that need access to environment variables.

---

## **Setting Up Obsidian for Front Matter**

### **Using the Templater Plugin**

1. **Install Templater**:
    
    - Open Obsidian.
    - Go to **Settings** > **Community Plugins**.
    - Enable **Safe Mode** if not already done.
    - Click on **Browse**, search for **Templater**, install, and enable it.
2. **Configure Templater**:
    
    - In **Settings** > **Templater**, set the **Template Folder Location** to your templates folder (e.g., `Templates`).
3. **Create a Front Matter Template**:
    
    - Create a new note in your templates folder named `Front Matter Template`.
        
    - Add the following content:
        
        markdown
        
        Copy code
        
        `--- title: ridhi gift date: 2024-09-29 description: tags: ---  # ridhi gift`
        
4. **Use the Template in New Notes**:
    
    - Create a new note in Obsidian.
    - Open the command palette (`Ctrl + P` or `Cmd + P`).
    - Search for **"Templater: Insert Template"**.
    - Select **Front Matter Template**.
    - The placeholders will be replaced with actual values.
5. **Update Existing Notes**:
    
    - Add the front matter to your existing notes.
    - Ensure all required fields (`title`, `date`, `description`, `tags`) are present.

---

## **Handling Obsidian-Specific Syntax**

- **Install `remark-obsidian` Plugin** (already installed in dependencies).
    
- **Configure in `next.config.js`**:
```
// next.config.js
const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.js',
  mdxOptions: {
    remarkPlugins: [
      [
        require('remark-obsidian'),
        {
          useMarkdownLinks: true,
          wikiLinkClassName: 'internal-link',
          internalLinkPrefix: '/posts/',
        },
      ],
    ],
  },
});

module.exports = withNextra({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
```

---

## **Generating RSS Feed**

1. **Create `scripts/gen-rss.js`**:
```
// scripts/gen-rss.js
const { promises: fs } = require('fs');
const path = require('path');
const RSS = require('rss');
const matter = require('gray-matter');

async function generate() {
  const feed = new RSS({
    title: 'Sahil Verma',
    site_url: 'https://youractualsite.com',
    feed_url: 'https://youractualsite.com/feed.xml',
  });

  const posts = await fs.readdir(path.join(__dirname, '..', 'pages', 'posts'));
  const allPosts = [];

  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.')) return;

      const content = await fs.readFile(
        path.join(__dirname, '..', 'pages', 'posts', name)
      );
      const frontmatter = matter(content);

      const tags = frontmatter.data.tags
        ? frontmatter.data.tags.split(',').map((tag) => tag.trim())
        : [];

      const date = frontmatter.data.date
        ? new Date(frontmatter.data.date)
        : new Date();

      allPosts.push({
        title: frontmatter.data.title || '',
        url: '/posts/' + name.replace(/\.mdx?$/, ''),
        date: date,
        description: frontmatter.data.description || '',
        categories: tags,
      });
    })
  );

  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  allPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: post.url,
      date: post.date,
      categories: post.categories,
    });
  });
  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
}

generate();

```
2. **Update `package.json` Build Script**:
    
    The build script already includes the RSS generation:
    
    json
    
    Copy code
    
    `"build": "npm run fetch-notes && node ./scripts/gen-rss.js && next build",`
    
3. **Ensure `gray-matter` and `rss` Packages are Installed**:
    
    These are included in your dependencies.
    

---

## **Adjusting Next.js Configuration**

- **Ensure `pageExtensions` Includes `.md` and `.mdx`**:
    
    javascript
    
    Copy code
    
    `// next.config.js module.exports = withNextra({   pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'], });`
    
- **Restart the Development Server After Changes**:
    
    bash
    
    Copy code
    
    `npm run dev`
    

---

## **Troubleshooting**

### **Posts Not Showing Up**

- **Issue**: Posts are not displayed on the website.
- **Solution**:
    - Ensure the `fetch-notes` script runs before starting the development server.
    - Verify that `pages/posts` contains your Markdown files.
    - Check that `next.config.js` includes `.md` in `pageExtensions`.
    - Restart the development server after configuration changes.

### **Errors During RSS Generation**

- **Issue**: Errors related to missing fields like `tags` or incorrect date formats.
- **Solution**:
    - Ensure all notes have the required front matter fields.
    - Update the `gen-rss.js` script to handle missing fields gracefully.
    - Use the `YYYY-MM-DD` date format in your front matter.

### **Authentication Errors**

- **Issue**: Failing to fetch notes due to authentication issues.
- **Solution**:
    - Ensure `GH_TOKEN` is correctly set in your `.env` file.
    - Verify that the token has the necessary permissions (read access to the repository).
    - Confirm that `dotenv` is properly loading environment variables.

---

## **Best Practices**

- **Consistent Front Matter**: Always include required fields in your notes to prevent build errors.
- **Use Templates**: Utilize Obsidian templates to ensure consistency.
- **Secure Tokens**: Never commit your `.env` file or tokens to version control.
- **Environment Variables**: Use `dotenv` for local development and set variables in Vercel for production.
- **Testing**: Regularly test your build process locally before deploying.
- **Configuration Management**: Keep your `next.config.js` and other configuration files up to date.

---

## **Deployment to Vercel**

1. **Set Up Environment Variables in Vercel**:
    
    - Go to your Vercel project dashboard.
    - Navigate to **Settings** > **Environment Variables**.
    - Add `GH_TOKEN` with your GitHub Personal Access Token.
2. **Deploying the Project**:
    
    - Push your code to GitHub.
    - Vercel will automatically build and deploy your project.
    - Monitor the deployment logs for any errors.
3. **Post-Deployment Checks**:
    
    - Visit your live site to ensure everything works as expected.
    - Verify that the posts are displayed and the RSS feed is accessible.

---

## **Summary**

By following this guide, you have set up a process to integrate your Obsidian notes into a Next.js website using Nextra and deployed it on Vercel. The notes are fetched during the build process, and the website displays the latest content from your Obsidian repository.

- **Automated Builds**: Notes are fetched and integrated automatically during the build.
- **Dynamic Content**: Any updates to your Obsidian notes are reflected on your website after deployment.
- **Scalable Solution**: The setup can handle additional notes and content as your repository grows.

---

## **Appendix**

### **Sample Files and Configurations**

#### **1. `.env` File**

env

Copy code

`GH_TOKEN=your_personal_access_token`

#### **2. `package.json`**

```
{
  "private": true,
  "license": "MIT",
  "scripts": {
    "dev": "npm run fetch-notes && next",
    "fetch-notes": "node scripts/fetch-notes.js",
    "build": "npm run fetch-notes && node ./scripts/gen-rss.js && next build",
    "start": "next start"
  },
  "dependencies": {
    "dotenv": "^16.3.1",
    "gray-matter": "^4.0.3",
    "next": "^13.5.6",
    "nextra": "^2.13.2",
    "nextra-theme-blog": "^2.13.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "remark-obsidian": "^1.8.0",
    "rss": "^1.2.2"
  }
  // ... rest of your package.json
}

```
#### **3. `next.config.js`**
```
// next.config.js
const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.js',
  mdxOptions: {
    remarkPlugins: [
      [
        require('remark-obsidian'),
        {
          useMarkdownLinks: true,
          wikiLinkClassName: 'internal-link',
          internalLinkPrefix: '/posts/',
        },
      ],
    ],
  },
});

module.exports = withNextra({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

```

### **Common Errors and Solutions**

#### **Error**: `TypeError: Cannot read properties of undefined`

- **Cause**: Missing front matter fields in notes.
- **Solution**: Ensure all notes include necessary fields like `title`, `date`, `description`, `tags`.

#### **Error**: Posts Not Displaying

- **Cause**: Next.js not recognizing `.md` files.
- **Solution**: Add `'md'` to `pageExtensions` in `next.config.js`.

#### **Error**: Authentication Failed During Fetch

- **Cause**: Incorrect or missing `GH_TOKEN`.
- **Solution**: Verify the token in your `.env` file and ensure it's set in Vercel's environment variables.

---
## Links

https://github.com/vercel/nextjs-portfolio-starter/blob/main/pages/posts/pages.md?plain=1