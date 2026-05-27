import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Index" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Writing" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/75 border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-md border border-border-strong flex items-center justify-center font-display text-[15px] text-accent">
            y
          </span>
          <span className="text-sm tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
            Yug Dalwadi
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
              activeProps={{ className: "px-3 py-1.5 text-sm text-foreground rounded-md" }}
            >
              {n.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            className="ml-3 px-3.5 py-1.5 text-sm rounded-md border border-border-strong text-foreground hover:bg-surface transition-colors"
          >
            Resume
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="px-6 py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground hover:text-foreground"
                activeProps={{ className: "py-2 text-sm text-foreground" }}
              >
                {n.label}
              </Link>
            ))}
            <a href="/resume.pdf" className="py-2 text-sm text-accent">
              Resume ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
