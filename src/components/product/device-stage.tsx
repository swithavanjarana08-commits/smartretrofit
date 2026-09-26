import { useEffect, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  exploded?: boolean;
  led?: "ok" | "warn" | "danger";
  autoRotate?: boolean;
};

export function DeviceStage(props: Props) {
  const [Canvas, setCanvas] = useState<ComponentType<Props> | null>(null);

  useEffect(() => {
    let alive = true;
    void import("./device-canvas").then((mod) => {
      if (alive) setCanvas(() => mod.DeviceCanvas);
    });
    return () => {
      alive = false;
    };
  }, []);

  if (!Canvas) {
    return <div className={cn("bg-panel", props.className)} />;
  }

  return <Canvas {...props} />;
}
