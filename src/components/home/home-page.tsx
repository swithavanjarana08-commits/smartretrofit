import { Link } from "@tanstack/react-router";
import { ArrowRight, Gauge, Radio, ShieldCheck, Waves } from "lucide-react";
import { DeviceStage } from "@/components/product/device-stage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COMPANY, FEATURES, IMPACT, PIPELINE, STATS } from "@/lib/content";

export function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <Badge variant="outline">
            {COMPANY.sihId} · Hardware · {COMPANY.theme}
          </Badge>
          <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Existing machines.
            <br />
            Intelligent behaviour.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            SmartRetrofit is a modular, plug-and-play IoT device that attaches to machines
            MSMEs already own. It learns a Machine DNA for each asset, then turns vibration,
            heat, current and voltage into maintenance action — without a ₹30–50 lakh
            replacement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/dashboard">
                Open live command centre
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/product">Inspect the 3D device</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-subtle">{COMPANY.tagline}</p>
        </div>
        <div className="overflow-hidden rounded-2xl bg-panel shadow-[var(--shadow-border)]">
          <DeviceStage className="h-80 sm:h-96 lg:h-[28rem]" />
          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-fg/70">
            <span>SR-32 edge unit · ESP32 · Wi-Fi</span>
            <span>Drag to orbit</span>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-surface px-5 py-8">
              <p className="font-display text-2xl tracking-tight text-ink sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-fg">{stat.label}</p>
              <p className="mt-1 text-xs text-subtle">{stat.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-subtle">The cost of waiting</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-tight text-ink">
          Unexpected breakdowns are still how most MSME plants discover a machine is unwell.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Late detection",
              body: "Problems surface after output, quality, or the bearing itself has already failed.",
            },
            {
              title: "Reactive spend",
              body: "Emergency repair, spare parts, and overtime replace planned, cheaper intervention.",
            },
            {
              title: "Premature replacement",
              body: "Repeated failures push owners toward new CNC and lathe capital they cannot justify.",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-6">
                <h3 className="font-display text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 overflow-hidden rounded-xl bg-panel px-5 py-5 text-sm text-fg/80 sm:px-8">
          <p className="font-medium text-fg">The gap we fill</p>
          <p className="mt-2 max-w-3xl">
            Existing machines lack an easy, adaptable, machine-specific monitoring layer that
            can detect issues early. SmartRetrofit is that layer — one base device, relevant
            sensor modules, and intelligence that belongs to that exact asset.
          </p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs font-medium uppercase tracking-widest text-subtle">Product</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-tight text-ink">
            A retrofit that learns each machine, instead of forcing every machine into one threshold.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <h3 className="font-display text-lg text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-subtle">
          Sense → Connect → Learn → Detect → Recommend
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
          From clamp-on sensors to a maintenance decision.
        </h2>
        <ol className="mt-10 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {PIPELINE.map((item) => (
            <li key={item.step} className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
              <p className="font-mono text-xs text-primary">{item.step}</p>
              <h3 className="mt-2 font-display text-sm text-ink">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-subtle">Live software</p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink">
              The command centre is the product the floor actually uses.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Health scores, Machine DNA, and an alert desk with a recommended action — not a
              wall of unexplained charts. Open the simulated MSME cell and inject a bearing or
              thermal fault during the walkthrough.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-fg">
              <li className="flex gap-2">
                <Waves className="mt-0.5 size-4 shrink-0 text-primary" />
                Vibration, temperature, current, voltage against a learned baseline
              </li>
              <li className="flex gap-2">
                <Gauge className="mt-0.5 size-4 shrink-0 text-primary" />
                Per-machine health and risk, not a generic plant average
              </li>
              <li className="flex gap-2">
                <Radio className="mt-0.5 size-4 shrink-0 text-primary" />
                Structured alerts with acknowledge flow for the pitch demo
              </li>
            </ul>
            <Button asChild className="mt-8">
              <Link to="/dashboard">
                Launch the demo
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="rounded-2xl bg-panel p-5 text-fg">
            <div className="flex items-center justify-between text-xs text-fg/60">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-ok" />
                LATHE-01 · running
              </span>
              <span className="font-mono">health 96</span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { k: "Vibration", v: "1.82 mm/s" },
                { k: "Temperature", v: "44.1 °C" },
                { k: "Current", v: "6.41 A" },
                { k: "Voltage", v: "231 V" },
              ].map((row) => (
                <div key={row.k} className="rounded-lg bg-white/5 p-3">
                  <p className="text-xs text-fg/55">{row.k}</p>
                  <p className="mt-1 font-mono text-lg tabular-nums">{row.v}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-fg/55">
              Preview of the live stream. Full fleet, DNA overlay, and fault injection live in
              the command centre.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-widest text-subtle">Impact</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium tracking-tight text-ink">
          Affordable Industry 4.0 for plants that cannot buy a new line.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {IMPACT.map((block) => (
            <Card key={block.title}>
              <CardContent className="p-6">
                <h3 className="font-display text-lg text-ink">{block.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {block.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
          <ShieldCheck className="size-4 text-primary" />
          Built for India's 6.3 crore MSMEs · Sources: Ministry of MSME, PIB, MoSPI
        </div>
      </section>

      <section className="border-t border-border bg-panel text-fg">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-fg/50">Next</p>
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight">
              Walk the hardware. Then break a machine on purpose.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="inverse">
              <Link to="/product">3D product</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">Command centre</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
