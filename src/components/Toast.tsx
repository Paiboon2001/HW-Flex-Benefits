import { useEffect } from "react";
import "./Toast.css";

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  /** Auto-dismiss delay in ms. */
  duration?: number;
}

/**
 * Success toast — implemented from Figma "Toast" (228:2793).
 */
export default function Toast({
  open,
  message,
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="toast" role="status">
      <span className="toast__icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#04cd83" />
          <path
            d="m8 12.2 2.6 2.6L16 9.4"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="toast__text">{message}</p>
      <button
        className="toast__close"
        type="button"
        aria-label="ปิด"
        onClick={onClose}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M5 5l10 10M15 5 5 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
