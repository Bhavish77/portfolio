import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: <Github size={18} /> },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin size={18} /> },
    { name: "Twitter", href: "https://twitter.com", icon: <Twitter size={18} /> },
    { name: "Email", href: "mailto:hello@bhavish.dev", icon: <Mail size={18} /> },
  ];

  return (
    <footer className="w-full border-t border-border/40 bg-background/50 py-12 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Info */}
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground flex items-center justify-center md:justify-start gap-1">
            Made with <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" /> using Next.js & Tailwind CSS
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            &copy; {currentYear} Bhavish. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="w-10 h-10 rounded-full border border-border/40 hover:border-violet-500/50 flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:bg-violet-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
