import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { BackgroundNetwork } from "@/components/BackgroundNetwork";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";

export function generateStaticParams() {
  return getAllBlogs().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <BackgroundNetwork />
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24">
        <a href="/blogs" className="font-mono text-sm text-muted transition hover:text-accent">
          &lt; back to blogs
        </a>

        <header className="mt-6 rounded-2xl border border-line bg-surface/75 p-6 shadow-panel sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            {post.date} • {post.readTime}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-text sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{post.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <article className="blog-content mt-8 rounded-2xl border border-line bg-surface/75 p-6 shadow-panel sm:p-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              img: ({ alt, src }) => (
                <img
                  alt={alt ?? "Blog image"}
                  src={typeof src === "string" ? src : ""}
                  className="my-6 w-full rounded-xl border border-line"
                />
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-accent underline decoration-accent/50 underline-offset-4">
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
