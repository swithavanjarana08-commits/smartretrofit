import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { cn } from "@/lib/utils";

export function SiteShell({
  children,
  dark = false,
  footer = true,
}: {
  children: ReactNode;
  dark?: boolean;
  footer?: boolean;
}) {
  return (
    <div className={cn("min-h-dvh bg-bg text-fg", dark && "dark")}>
      <SiteHeader inverted={dark} />
      <main>{children}</main>
      {footer ? <SiteFooter /> : null}
    </div>
  );
}
