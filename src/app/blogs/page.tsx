import { BackgroundNetwork } from "@/components/BackgroundNetwork";
import { getAllBlogs } from "@/lib/blogs";
import { profile } from "@/data/portfolio";

export default function BlogsPage() {
  const blogPosts = getAllBlogs();

  return (
    <main>
      <BackgroundNetwork />
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mb-8">
          <a href="/" className="font-mono text-sm text-muted transition hover:text-accent">
            &lt; back to home
          </a>
          <h1 className="mt-4 text-3xl font-semibold text-text sm:text-5xl">Blogs</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            Technical writing by {profile.name} on ML systems, model training, and production engineering.
          </p>
        </div>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-line bg-surface/75 p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {post.date} • {post.readTime}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-text">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{post.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-md border border-line px-2 py-1 font-mono text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={`/blogs/${post.slug}`}
                className="mt-5 inline-flex rounded-lg border border-accent/60 bg-accent/10 px-4 py-2 text-sm font-medium text-text transition hover:bg-accent/20"
              >
                Read Blog
              </a>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
