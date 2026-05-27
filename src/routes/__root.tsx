import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
} from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContourBackground } from "@/components/ContourBackground";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs text-accent">404 · not found</p>
        <h1 className="mt-3 font-display text-5xl text-foreground">Lost in latent space.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist. Let's head somewhere with signal.
        </p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs text-destructive">runtime error</p>
        <h1 className="mt-3 font-display text-4xl">Something didn't compile.</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground"
          >Try again</button>
          <a href="/" className="px-4 py-2 text-sm rounded-md border border-border">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { title: "Yug Dalwadi — AI & Data Science" },
      { name: "description", content: "Portfolio and writing of Yug Dalwadi — an undergraduate student at IIT Jodhpur, specializing in Artificial Intelligence and Data Science." },
      { property: "og:title", content: "Yug Dalwadi — AI & Data Science" },
      { property: "og:description", content: "AI, machine learning, and data science." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Yug Dalwadi" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <div className="min-h-screen flex flex-col bg-grain relative">
        <ContourBackground />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
