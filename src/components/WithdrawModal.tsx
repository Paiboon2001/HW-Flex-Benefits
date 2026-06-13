import { useEffect, useState } from "react";
import Button from "./Button";
import "./WithdrawModal.css";

interface WithdrawModalProps {
  open: boolean;
  name: string;
  /** The benefit's allocated budget. */
  total: number;
  image?: string | null;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  onEdit?: () => void;
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/**
 * "เบิก Benefits" withdraw modal — implemented from Figma (228:377).
 * Opens from a benefit card; on confirm the withdrawn amount is recorded.
 */
export default function WithdrawModal({
  open,
  name,
  total,
  image,
  onClose,
  onConfirm,
  onEdit,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!open) {
      setAmount("");
      return;
    }
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

  const value = parseFloat(amount.replace(/,/g, "")) || 0;
  const exceedsTotal = value > total;
  const isValid = value > 0 && !exceedsTotal;

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setAmount(digits ? Number(digits).toLocaleString("en-US") : "");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="withdraw__head">
          <h2 className="withdraw__title" id="wm-title">
            เบิก Benefits
          </h2>
          <Button variant="outline" onClick={onEdit}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6" />
              <path d="M3 10h18" />
              <path d="M16 19.5 19.5 16a1.4 1.4 0 0 1 2 2L18 21.5l-2.5.5.5-2.5Z" />
            </svg>
            แก้ไข Benefit
          </Button>
        </header>

        <div className="withdraw__info">
          <div className="withdraw__thumb">
            {image && <img src={image} alt="" />}
          </div>
          <div className="withdraw__detail">
            <p className="withdraw__name">{name}</p>
            <div className="withdraw__budget">
              <span className="withdraw__budget-value">{fmt(total)}</span>
              <span className="withdraw__budget-unit">THB</span>
            </div>
          </div>
        </div>

        <div className="withdraw__fields">
          <div className="tf-field">
            <div
              className={`tf tf--amount${amount ? " tf--filled" : ""}${
                exceedsTotal ? " tf--error" : ""
              }`}
            >
              <input
                id="wm-amount"
                className="tf__input"
                type="text"
                inputMode="numeric"
                placeholder=" "
                value={amount}
                onChange={handleAmount}
              />
              <label htmlFor="wm-amount" className="tf__label">
                ใส่จำนวนเงิน
              </label>
              <span className="tf__suffix">THB</span>
            </div>
            {exceedsTotal && (
              <p className="tf__error" role="alert">
                ไม่สามารถใส่จำนวนเงินที่มากกว่า{" "}
                {total.toLocaleString("en-US")} บาทได้
              </p>
            )}
          </div>
          <div className="withdraw__note">
            <svg
              className="withdraw__note-icon"
              width="17"
              height="17"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.99984 13.3333V9.99996M9.99984 6.66663H10.0082M18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              คุณสามารถแก้ไข benefit ของคุณได้หากจำนวนเงินที่ต้องการไม่เพียงพอ
            </span>
          </div>
        </div>

        <footer className="modal__foot">
          <button
            type="button"
            className="modal-btn modal-btn--outline"
            onClick={onClose}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            className="modal-btn modal-btn--primary"
            onClick={() => onConfirm(value)}
            disabled={!isValid}
          >
            ยืนยัน
          </button>
        </footer>
      </div>
    </div>
  );
}
