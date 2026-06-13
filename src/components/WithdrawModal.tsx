import { useEffect, useState } from "react";
import Button from "./Button";
import { formatMoneyInput } from "./CreateBenefitModal";
import "./WithdrawModal.css";

interface WithdrawModalProps {
  open: boolean;
  name: string;
  /** The benefit's allocated budget. */
  total: number;
  /** Amount already disbursed via submitted requests. */
  disbursed?: number;
  /** Pre-fill the field when editing an existing withdrawal (0 = blank). */
  initialAmount?: number;
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
  disbursed = 0,
  initialAmount = 0,
  image,
  onClose,
  onConfirm,
  onEdit,
}: WithdrawModalProps) {
  const [amount, setAmount] = useState("");

  // Pre-fill (or clear) the field whenever the popup opens — when editing an
  // existing withdrawal, show the amount already entered so it can be edited.
  useEffect(() => {
    setAmount(
      open && initialAmount > 0 ? formatMoneyInput(String(initialAmount)) : ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  // Remaining budget on the card = allocated − already disbursed.
  const available = Math.max(0, total - disbursed);
  const value = parseFloat(amount.replace(/,/g, "")) || 0;
  const exceedsTotal = value > available;
  const isValid = value > 0 && !exceedsTotal;

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(formatMoneyInput(e.target.value));
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
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1.66699 8.33268H18.3337V6.83268C18.3337 5.89926 18.3337 5.43255 18.152 5.07603C17.9922 4.76243 17.7372 4.50746 17.4236 4.34767C17.0671 4.16602 16.6004 4.16602 15.667 4.16602H4.33366C3.40024 4.16602 2.93353 4.16602 2.57701 4.34767C2.2634 4.50746 2.00844 4.76243 1.84865 5.07603C1.66699 5.43255 1.66699 5.89926 1.66699 6.83268V13.166C1.66699 14.0994 1.66699 14.5661 1.84865 14.9227C2.00844 15.2363 2.2634 15.4912 2.57701 15.651C2.93353 15.8327 3.40024 15.8327 4.33366 15.8327H9.16699M12.0837 17.4993L13.7711 17.1619C13.9183 17.1324 13.9918 17.1177 14.0604 17.0908C14.1213 17.0669 14.1792 17.0359 14.2329 16.9985C14.2933 16.9564 14.3463 16.9033 14.4525 16.7972L17.917 13.3327C18.3772 12.8724 18.3772 12.1263 17.917 11.666C17.4568 11.2058 16.7106 11.2058 16.2503 11.666L12.7858 15.1306C12.6797 15.2367 12.6266 15.2897 12.5845 15.3502C12.5471 15.4038 12.5161 15.4617 12.4922 15.5226C12.4653 15.5912 12.4506 15.6647 12.4212 15.8119L12.0837 17.4993Z" />
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
              <span className="withdraw__budget-value">{fmt(available)}</span>
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
                inputMode="decimal"
                autoComplete="off"
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
                {available.toLocaleString("en-US")} บาทได้
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
