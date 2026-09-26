import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home/home-page";
import { SiteShell } from "@/components/layout/site-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell>
      <HomePage />
    </SiteShell>
  );
}
