import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";

interface StatNumberProps {
  value: string;
  className?: string;
}

export function StatNumber({ value, className }: StatNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  const numeric = parseInt(value.replace(/\D/g, ""), 10);
  const isNumeric = !isNaN(numeric) && value !== "24/7";
  const count = useCountUp(numeric, 1800, started && isNumeric);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {isNumeric && started ? count : value}
    </div>
  );
}
