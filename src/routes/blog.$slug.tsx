import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getBlog, type BlogPost } from "@/lib/content";
import { Markdown, buildToc } from "@/components/Markdown";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlog(params.slug);
    if (!post) throw notFound();
    return { post } as { post: BlogPost };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Yug Dalwadi` },
          { name: "description", content: loaderData.post.description },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.description },
          { property: "og:type", content: "article" },
          ...(loaderData.post.cover ? [{ property: "og:image", content: loaderData.post.cover }] : []),
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/blog/${loaderData.post.slug}` }] : [],
    scripts: loaderData
      ? [{
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.post.title,
            description: loaderData.post.description,
            datePublished: loaderData.post.date,
            author: { "@type": "Person", name: "Yug Dalwadi" },
            ...(loaderData.post.cover ? { image: loaderData.post.cover } : {}),
          }),
        }]
      : [],
  }),
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <p className="font-mono text-xs text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl">Post not found.</h1>
      <Link to="/blog" className="mt-6 inline-block text-accent hover:underline">← All writing</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Could not load post.</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const toc = buildToc(post.content);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-24">
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent">
        <ArrowLeft size={14} /> All writing
      </Link>

      <div className="mt-10 grid lg:grid-cols-12 gap-12">
        <article className="lg:col-span-8 lg:col-start-2">
          <header>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs text-accent">{post.date}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="font-mono text-xs text-muted-foreground">{post.readingTime}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.1]">{post.title}</h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{post.description}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((t: string) => (
                <span key={t} className="px-2 py-0.5 text-[11px] font-mono text-accent/80 border border-border rounded">#{t}</span>
              ))}
            </div>
          </header>

          {post.cover && (
            <img src={post.cover} alt={post.title} className="mt-10 rounded-xl border border-border w-full" />
          )}

          <div className="mt-10">
            <Markdown>{post.content}</Markdown>
          </div>

          <div className="mt-20 pt-8 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
            <p>— Yug</p>
            <Link to="/blog" className="hover:text-accent">More writing →</Link>
          </div>
        </article>

        {toc.length > 0 && (
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">On this page</p>
              <ul className="space-y-2 text-sm border-l border-border">
                {toc.map((t) => (
                  <li key={t.slug} className={t.depth === 3 ? "pl-6" : "pl-4"}>
                    <a href={`#${t.slug}`} className="block py-0.5 text-muted-foreground hover:text-accent transition-colors">
                      {t.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
