import { useEffect, type ReactNode } from "react";
import "./ConfirmModal.css";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Custom icon; defaults to the green check (Figma 228:433). */
  icon?: ReactNode;
  /** Render the confirm button in the destructive red style. */
  confirmDanger?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Confirmation dialog — implemented from Figma "Confirm Send" (228:433).
 */
export default function ConfirmModal({
  open,
  title = "คุณต้องการส่งคำขอนี้หรือไม่",
  message = "กรุณายืนยันการส่งคำขอเบิกงบประมาณ",
  confirmLabel = "ยืนยัน",
  cancelLabel = "ยกเลิก",
  icon,
  confirmDanger = false,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="confirm"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm__body">
          <div className="confirm__icon">
            {icon ?? (
              <img className="confirm__icon--fill" src="/assets/check.svg" alt="" />
            )}
          </div>
          <div className="confirm__text">
            <p className="confirm__title">{title}</p>
            <p className="confirm__message">{message}</p>
          </div>
        </div>
        <div className="confirm__foot">
          <button
            type="button"
            className="modal-btn confirm__cancel"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`modal-btn ${
              confirmDanger ? "modal-btn--danger" : "modal-btn--primary"
            }`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
