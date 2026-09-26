import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";
import {
  Activity,
  AlertTriangle,
  Cpu,
  RotateCcw,
  Thermometer,
  Waves,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  SENSOR_KEYS,
  formatSensor,
  type FaultKind,
  type SensorKey,
} from "@/lib/fleet";
import { useFleetStore } from "@/store/fleet-store";
import { cn } from "@/lib/utils";

const FAULTS: { id: FaultKind; label: string }[] = [
  { id: "bearing", label: "Bearing wear" },
  { id: "overheat", label: "Overheating" },
  { id: "current", label: "Current spike" },
  { id: "voltage", label: "Voltage sag" },
];

const SENSOR_META: Record<SensorKey, { icon: typeof Waves; hint: string }> = {
  vibration: { icon: Waves, hint: "ISO-inspired RMS" },
  temperature: { icon: Thermometer, hint: "Housing / winding" },
  current: { icon: Zap, hint: "Line draw" },
  voltage: { icon: Activity, hint: "Supply quality" },
};

export function CommandCenter() {
  const machines = useFleetStore((s) => s.machines);
  const alerts = useFleetStore((s) => s.alerts);
  const selectedId = useFleetStore((s) => s.selectedId);
  const running = useFleetStore((s) => s.running);
  const select = useFleetStore((s) => s.select);
  const tick = useFleetStore((s) => s.tick);
  const injectFault = useFleetStore((s) => s.injectFault);
  const acknowledge = useFleetStore((s) => s.acknowledge);
  const reset = useFleetStore((s) => s.reset);
  const setRunning = useFleetStore((s) => s.setRunning);
  const seen = useRef(new Set<string>());

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => tick(), 750);
    return () => window.clearInterval(id);
  }, [running, tick]);

  useEffect(() => {
    for (const alert of alerts) {
      if (seen.current.has(alert.id) || alert.acknowledged) continue;
      seen.current.add(alert.id);
      toast(alert.title, {
        description: `${alert.machineName} · ${alert.action}`,
        duration: 5200,
      });
    }
  }, [alerts]);

  const selected = machines.find((m) => m.id === selectedId) ?? machines[0];
  const openAlerts = alerts.filter((a) => !a.acknowledged);
  const fleetHealth = Math.round(
    machines.reduce((sum, m) => sum + m.health, 0) / Math.max(machines.length, 1),
  );

  if (!selected) return null;

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-subtle">
            Command centre · simulated MSME cell
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-fg">
            Live machine intelligence
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Six shop-floor assets streaming into SmartRetrofit. Inject a fault during the
            pitch to watch Machine DNA raise an alert with a recommended action.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatChip label="Fleet health" value={`${fleetHealth}`} />
          <StatChip label="Open alerts" value={`${openAlerts.length}`} warn={openAlerts.length > 0} />
          <StatChip label="Assets" value={`${machines.length}`} />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
        <Card className="bg-surface p-3">
          <p className="px-2 pb-2 text-xs uppercase tracking-wider text-subtle">Fleet</p>
          <div className="flex flex-col gap-1">
            {machines.map((machine) => (
              <button
                key={machine.id}
                type="button"
                onClick={() => select(machine.id)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-3 text-left transition-colors duration-150",
                  machine.id === selected.id ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/70 hover:text-fg",
                )}
              >
                <span>
                  <span className="block font-mono text-xs text-subtle">{machine.id}</span>
                  <span className="block text-sm text-fg">{machine.name}</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-sm tabular-nums">{machine.health}</span>
                  <span className={cn("size-2 rounded-full", riskDot(machine.risk))} />
                </span>
              </button>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="bg-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs text-subtle">{selected.id}</p>
                <h2 className="font-display text-xl text-fg">{selected.name}</h2>
                <p className="text-sm text-muted">
                  {selected.type} · {selected.line}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={selected.risk === "critical" ? "danger" : selected.risk === "warning" ? "warn" : "ok"}>
                  {selected.status}
                </Badge>
                <Badge variant="muted">{selected.sensors.hours.toFixed(1)} h</Badge>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {SENSOR_KEYS.map((key) => {
                const Icon = SENSOR_META[key].icon;
                const band = selected.dna[key];
                const value = selected.sensors[key];
                const z = Math.abs(value - band.mean) / band.sigma;
                return (
                  <div key={key} className="rounded-lg bg-elevated p-3">
                    <div className="flex items-center justify-between text-subtle">
                      <Icon className="size-4" />
                      <span className="text-xs uppercase">{band.unit}</span>
                    </div>
                    <p className="mt-2 font-mono text-xl tabular-nums text-fg">
                      {formatSensor(key, value)}
                    </p>
                    <p className="text-xs capitalize text-muted">{band.label}</p>
                    <p className={cn("mt-1 text-xs tabular-nums", z > 2.4 ? "text-warn" : "text-subtle")}>
                      DNA {band.mean}
                      {z > 2.4 ? ` · z ${z.toFixed(1)}` : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-fg">Telemetry</p>
              <p className="text-xs text-subtle">Last {selected.history.length} samples</p>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selected.history} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="vib" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3dcc7a" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#3dcc7a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={["auto", "auto"]} />
                  <Tooltip
                    contentStyle={{
                      background: "#0c1310",
                      border: "1px solid #1d2c24",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelFormatter={() => "Live sample"}
                  />
                  <Area
                    type="monotone"
                    dataKey="vibration"
                    stroke="#3dcc7a"
                    fill="url(#vib)"
                    strokeWidth={1.6}
                    isAnimationActive={false}
                    name="Vibration"
                  />
                  <Area
                    type="monotone"
                    dataKey="temperature"
                    stroke="#d4b06a"
                    fill="none"
                    strokeWidth={1.2}
                    isAnimationActive={false}
                    name="Temperature"
                  />
                  <Area
                    type="monotone"
                    dataKey="current"
                    stroke="#93a0aa"
                    fill="none"
                    strokeWidth={1.2}
                    isAnimationActive={false}
                    name="Current"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="bg-surface p-5">
            <p className="text-sm text-fg">Pitch controls</p>
            <p className="mt-1 text-xs text-muted">
              Drive a failure mode on the selected machine. The DNA layer needs a few samples
              before it raises a structured alert.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {FAULTS.map((fault) => (
                <Button
                  key={fault.id}
                  size="sm"
                  variant={selected.fault === fault.id ? "default" : "secondary"}
                  onClick={() => injectFault(selected.id, fault.id)}
                >
                  {fault.label}
                </Button>
              ))}
              <Button size="sm" variant="ghost" onClick={() => setRunning(!running)}>
                {running ? "Pause stream" : "Resume stream"}
              </Button>
              <Button size="sm" variant="ghost" onClick={reset}>
                <RotateCcw className="size-3.5" />
                Reset fleet
              </Button>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="bg-surface p-5">
            <div className="mb-3 flex items-center gap-2">
              <Cpu className="size-4 text-primary" />
              <p className="text-sm text-fg">Machine DNA</p>
            </div>
            <DnaPlot machineId={selected.id} />
            <p className="mt-3 text-xs leading-relaxed text-muted">
              The filled polygon is this asset's learned baseline. The overlay is live
              deviation. Alerts fire when a channel holds outside DNA, not on a single spike.
            </p>
          </Card>

          <Card className="flex min-h-80 flex-col bg-surface p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-4 text-warn" />
                <p className="text-sm text-fg">Alert desk</p>
              </div>
              <span className="font-mono text-xs text-subtle">{openAlerts.length} open</span>
            </div>
            <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
              {alerts.length === 0 ? (
                <p className="text-sm text-muted">
                  Quiet floor. Inject a fault to demonstrate predictive alerting.
                </p>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={cn(
                      "rounded-lg border border-border p-3",
                      alert.acknowledged && "opacity-50",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-fg">{alert.title}</p>
                      <Badge variant={alert.severity === "critical" ? "danger" : "warn"}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="mt-1 font-mono text-xs text-subtle">
                      {alert.machineId} · {new Date(alert.ts).toLocaleTimeString()}
                    </p>
                    <p className="mt-2 text-xs text-muted">{alert.detail}</p>
                    <p className="mt-2 text-xs text-fg">{alert.action}</p>
                    {!alert.acknowledged ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2 h-8 px-2"
                        onClick={() => acknowledge(alert.id)}
                      >
                        Acknowledge
                      </Button>
                    ) : null}
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatChip({ label, value, warn = false }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="rounded-lg bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
      <p className="text-xs uppercase tracking-wider text-subtle">{label}</p>
      <p className={cn("font-mono text-2xl tabular-nums", warn ? "text-warn" : "text-fg")}>{value}</p>
    </div>
  );
}

function riskDot(risk: string) {
  if (risk === "critical") return "bg-danger";
  if (risk === "warning") return "bg-warn";
  return "bg-ok";
}

function DnaPlot({ machineId }: { machineId: string }) {
  const machine = useFleetStore((s) => s.machines.find((m) => m.id === machineId));
  const points = useMemo(() => {
    if (!machine) return { base: "", live: "", labels: [] as { x: number; y: number; label: string }[] };
    const cx = 80;
    const cy = 80;
    const r = 52;
    const keys = SENSOR_KEYS;
    const to = (i: number, mag: number) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / keys.length;
      return [cx + Math.cos(a) * r * mag, cy + Math.sin(a) * r * mag] as const;
    };
    const base = keys.map((_, i) => to(i, 0.55).join(",")).join(" ");
    const live = keys
      .map((key, i) => {
        const z = Math.abs(machine.sensors[key] - machine.dna[key].mean) / machine.dna[key].sigma;
        return to(i, Math.min(1, 0.55 + z * 0.12)).join(",");
      })
      .join(" ");
    const labels = keys.map((key, i) => {
      const [x, y] = to(i, 1.18);
      return { x, y, label: machine.dna[key].label.slice(0, 4) };
    });
    return { base, live, labels };
  }, [machine]);

  if (!machine) return null;

  return (
    <svg viewBox="0 0 160 160" className="mx-auto h-44 w-full text-primary">
      {[0.3, 0.55, 0.8, 1].map((s) => (
        <circle key={s} cx="80" cy="80" r={52 * s} fill="none" stroke="currentColor" className="text-border" />
      ))}
      <polygon points={points.base} fill="currentColor" className="text-primary/25" stroke="currentColor" strokeWidth="1" />
      <polygon points={points.live} fill="none" stroke="currentColor" className="text-warn" strokeWidth="1.4" />
      {points.labels.map((label) => (
        <text
          key={label.label}
          x={label.x}
          y={label.y}
          textAnchor="middle"
          className="fill-muted"
          fontSize="8"
        >
          {label.label}
        </text>
      ))}
    </svg>
  );
}
