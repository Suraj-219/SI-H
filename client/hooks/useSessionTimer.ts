import { useEffect, useRef, useState } from "react";

export function useSessionTimer(refreshSeconds: number = 10) {
  const [secondsLeft, setSecondsLeft] = useState(refreshSeconds);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    function tick() {
      setSecondsLeft((s) => {
        if (s <= 1) return refreshSeconds;
        return s - 1;
      });
      tickRef.current = window.setTimeout(tick, 1000);
    }
    tickRef.current = window.setTimeout(tick, 1000);
    return () => {
      if (tickRef.current) window.clearTimeout(tickRef.current);
    };
  }, [refreshSeconds]);

  // Trigger change when countdown resets
  const generation = Math.floor((Date.now() / 1000) / refreshSeconds);

  return { secondsLeft, refreshSeconds, generation };
}
