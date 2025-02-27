import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

type Metadata = {
  title: string
  date: string
  description: string
  tags?: string[]
  image?: string
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  if (!match) {
    throw new Error("No frontmatter found")
  }
  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  let metadata = yaml.load(frontMatterBlock) as Partial<Metadata>

  // Support legacy frontmatter keys
  if (!metadata.date && (metadata as any).publishedAt) {
    metadata.date = (metadata as any).publishedAt
  }
  if (!metadata.description && (metadata as any).summary) {
    metadata.description = (metadata as any).summary
  }

  // Convert date to a string if YAML parsed it as a Date
  if (metadata.date && typeof metadata.date !== 'string') {
    // toISOString() returns a string like "2018-04-05T00:00:00.000Z"
    // We extract only the date portion for consistency.
    metadata.date = new Date(metadata.date).toISOString().split('T')[0]
  }

  // Ensure required fields exist
  if (!metadata.title || !metadata.date || metadata.description === undefined) {
    throw new Error("Missing required frontmatter fields")
  }

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))
    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date()
  // If date string doesn't include time, append a default time.
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  const targetDate = new Date(date)

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  const daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
