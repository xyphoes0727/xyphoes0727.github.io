import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
};

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

function isBlogFilename(filename: string) {
  return filename.endsWith(".md") || filename.endsWith(".mdx");
}

function fileToSlug(filename: string) {
  return filename.replace(/\.(md|mdx)$/i, "");
}

function parsePostFromFile(filePath: string): BlogPost {
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  const tags = Array.isArray(data.tags)
    ? data.tags.map((tag) => String(tag))
    : [];

  return {
    slug: fileToSlug(path.basename(filePath)),
    title: String(data.title ?? "Untitled"),
    summary: String(data.summary ?? ""),
    date: String(data.date ?? "1970-01-01"),
    readTime: String(data.readTime ?? "5 min read"),
    tags,
    content,
  };
}

export function getAllBlogs(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOGS_DIR).filter(isBlogFilename);

  return files
    .map((file) => parsePostFromFile(path.join(BLOGS_DIR, file)))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const filePathMd = path.join(BLOGS_DIR, `${slug}.md`);
  const filePathMdx = path.join(BLOGS_DIR, `${slug}.mdx`);

  if (fs.existsSync(filePathMd)) {
    return parsePostFromFile(filePathMd);
  }

  if (fs.existsSync(filePathMdx)) {
    return parsePostFromFile(filePathMdx);
  }

  return undefined;
}
