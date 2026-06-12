import Button from "./Button";
import Icon from "./Icon";
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
        <Icon name="plus" size={20} />
        {ctaLabel}
      </Button>
    </div>
  );
}
