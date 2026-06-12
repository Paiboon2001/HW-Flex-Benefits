import { useEffect } from "react";
import "./Splash.css";

interface SplashProps {
  /** Called once the splash finishes (default 2.5s). */
  onFinish?: () => void;
  /** Duration the splash stays on screen, in ms. */
  duration?: number;
}

/**
 * Splash screen — implemented from Figma "Automated / Splash" (node 228:6257).
 * Plays the HappyWork splash video centered on a white canvas.
 * Fully responsive: the video scales with the viewport on every screen size.
 */
export default function Splash({ onFinish, duration = 2500 }: SplashProps) {
  useEffect(() => {
    if (!onFinish) return;
    const timer = setTimeout(onFinish, duration);
    return () => clearTimeout(timer);
  }, [onFinish, duration]);

  return (
    <div className="splash" data-node-id="228:6257">
      <video
        className="splash__video"
        src="/assets/HHSLPASH.mp4"
        autoPlay
        muted
        playsInline
        aria-label="HappyWork"
      />
    </div>
  );
}
