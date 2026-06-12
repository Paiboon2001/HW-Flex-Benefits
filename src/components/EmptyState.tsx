import Button from "./Button";
import "./EmptyState.css";

interface EmptyStateProps {
  message?: string;
  ctaLabel?: string;
  onCreate?: () => void;
}

/**
 * Empty state shown when the user has no benefits yet.
 */
export default function EmptyState({
  message = "ยังไม่มี Benefits กรุณาสร้าง Benefit",
  ctaLabel = "สร้าง Benefit",
  onCreate,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__art" aria-hidden="true">
        <img className="empty-state__box" src="/assets/empty-box.svg" alt="" />
        <img className="empty-state__lid" src="/assets/empty-lid.svg" alt="" />
      </div>
      <p className="empty-state__message">{message}</p>
      <Button variant="primary" onClick={onCreate}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99984 4.16663V15.8333M4.1665 9.99996H15.8332"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {ctaLabel}
      </Button>
    </div>
  );
}
