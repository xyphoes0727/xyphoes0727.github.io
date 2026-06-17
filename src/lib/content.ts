function matter(raw: string): { data: Record<string, unknown>; content: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, content: raw };
  const data: Record<string, unknown> = {};
  const lines = m[1].split(/\r?\n/);
  for (const line of lines) {
    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;
    const key = kv[1];
    let val: string = kv[2].trim();
    let parsed: unknown = val;
    if (/^\[.*\]$/.test(val)) {
      try { parsed = JSON.parse(val.replace(/'/g, '"')); } catch {
        parsed = val.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
      }
    } else if (val === "true" || val === "false") {
      parsed = val === "true";
    } else if (/^-?\d+(\.\d+)?$/.test(val)) {
      parsed = Number(val);
    } else {
      parsed = val.replace(/^["']|["']$/g, "");
    }
    data[key] = parsed;
  }
  return { data, content: m[2] };
}

export interface BlogMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  readingTime: string;
}
export interface BlogPost extends BlogMeta {
  content: string;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  category: string;
  cover?: string;
  links?: { label: string; href: string }[];
  featured?: boolean;
}
export interface Project extends ProjectMeta {
  content: string;
}

const blogFiles = import.meta.glob("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const projectFiles = import.meta.glob("/src/content/projects/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugFrom(path: string) {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200)) + 10} min read`;
}

export const allBlogs: BlogPost[] = Object.entries(blogFiles)
  .map(([path, raw]) => {
    const { data, content } = matter(raw);
    return {
      slug: slugFrom(path),
      title: (data.title as string) ?? "Untitled",
      description: (data.description as string) ?? "",
      date: (data.date as string) ?? "",
      tags: (data.tags as string[]) ?? [],
      cover: data.cover as string | undefined,
      readingTime: readingTime(content),
      content,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const allProjects: Project[] = Object.entries(projectFiles)
  .map(([path, raw]) => {
    const { data, content } = matter(raw);
    return {
      slug: slugFrom(path),
      title: (data.title as string) ?? "Untitled",
      description: (data.description as string) ?? "",
      year: String(data.year ?? ""),
      tags: (data.tags as string[]) ?? [],
      category: (data.category as string) ?? "Misc",
      cover: data.cover as string | undefined,
      links: (data.links as { label: string; href: string }[]) ?? [],
      featured: (data.featured as boolean) ?? false,
      content,
    };
  })
  .sort((a, b) => (a.year < b.year ? 1 : -1));

export function getBlog(slug: string) {
  return allBlogs.find((b) => b.slug === slug);
}
export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}
