import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-foreground">Yug Dalwadi</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            AI/ML engineer working at the intersection of machine learning, systems, and autonomous software.
          </p>
        </div>

        <div className="text-sm">
          <p className="text-muted-foreground mb-3">Navigate</p>
          <ul className="space-y-2">
            <li><Link to="/projects" className="hover:text-accent">Projects</Link></li>
            <li><Link to="/blog" className="hover:text-accent">Writing</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><a href="/rss.xml" className="hover:text-accent">RSS</a></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="text-muted-foreground mb-3">Elsewhere</p>
          <ul className="space-y-2">
            <li><a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-accent"><Github size={14}/> GitHub</a></li>
            <li><a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-accent"><Linkedin size={14}/> LinkedIn</a></li>
            <li><a href="mailto:hello@yugdalwadi.com" className="inline-flex items-center gap-2 hover:text-accent"><Mail size={14}/> Email</a></li>
            <li><a href="/resume.pdf" className="inline-flex items-center gap-2 hover:text-accent"><FileText size={14}/> Resume</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Yug Dalwadi. Built with intent.</p>
          <p className="font-mono">v1.0 · last updated {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}</p>
        </div>
      </div>
    </footer>
  );
}
