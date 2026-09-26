import { cn } from "@/lib/utils";

export function Logo({ className, markOnly = false }: { className?: string; markOnly?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-fg", className)}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
        <rect x="3" y="8" width="20" height="16" rx="3" fill="currentColor" className="text-primary" />
        <rect x="6" y="11" width="8" height="4" rx="1" fill="currentColor" className="text-primary-fg" />
        <circle cx="22" cy="10" r="2.2" fill="currentColor" className="text-fg" />
        <path
          d="M22 8.2c3.4-1.2 6.2.4 7.2 3.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="text-fg"
        />
        <circle cx="23.5" cy="20" r="1.2" fill="currentColor" className="text-primary-fg" />
      </svg>
      {markOnly ? null : (
        <span className="font-display text-sm font-semibold tracking-tight">
          SmartRetrofit
        </span>
      )}
    </span>
  );
}
