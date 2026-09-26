import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";
import { COMPANY } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted">
            {COMPANY.tagline} A retrofit intelligence layer for machines Indian MSMEs already own.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-subtle">Product</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <Link to="/product" className="text-muted hover:text-fg">
              Hardware
            </Link>
            <Link to="/dashboard" className="text-muted hover:text-fg">
              Live command centre
            </Link>
            <Link to="/technology" className="text-muted hover:text-fg">
              Machine DNA
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-subtle">Contact</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted">
            <span>{COMPANY.city}</span>
            <a href={`mailto:${COMPANY.email}`} className="hover:text-fg">
              {COMPANY.email}
            </a>
            <a href={`tel:+91${COMPANY.phone}`} className="hover:text-fg">
              {COMPANY.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-subtle sm:flex-row sm:justify-between sm:px-6">
          <span>
            {COMPANY.name} · {COMPANY.product}
          </span>
          <span>
            SIH {COMPANY.sihId} · {COMPANY.theme} · {COMPANY.category}
          </span>
        </div>
      </div>
    </footer>
  );
}
