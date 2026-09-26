import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/product", label: "Product" },
  { to: "/dashboard", label: "Live demo" },
  { to: "/technology", label: "Technology" },
  { to: "/team", label: "Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ inverted = false }: { inverted?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md",
        inverted
          ? "border-white/10 bg-bg/80 text-fg"
          : "border-border/80 bg-bg/80",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors duration-150 hover:text-fg"
              activeProps={{ className: "text-fg" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button asChild size="sm">
            <Link to="/dashboard">Open command centre</Link>
          </Button>
        </div>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md text-fg md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-md px-2 py-3 text-sm text-fg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                Open command centre
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
