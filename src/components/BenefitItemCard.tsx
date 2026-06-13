import { useEffect, useRef, useState } from "react";
import "./BenefitItemCard.css";

export interface Benefit {
  id: string;
  name: string;
  /** (5) Pocket budget, set when the card is created. */
  total: number;
  /** (4) Amount disbursed via submitted requests — drives the progress bar. */
  disbursed?: number;
  /** (6) Pending withdrawal entered in the popup; > 0 means the card is selected. */
  used?: number;
  image?: string | null;
}

interface BenefitItemCardProps {
  name: string;
  total: number;
  disbursed?: number;
  used?: number;
  image?: string | null;
  /** Its withdraw popup is currently open — blue border without checkmark. */
  active?: boolean;
  onClick?: () => void;
  /** "แก้ไขการเบิกงบ" — only shown when the card is selected (used > 0). */
  onEditWithdraw?: () => void;
  /** "แก้ไข Benefit" — opens the edit modal. */
  onEditBenefit?: () => void;
  /** "ลบ" — delete the card. */
  onDelete?: () => void;
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/**
 * A single created Benefit card — implemented from Figma "Card Benefit01"
 * (228:2266) with the selected/done state (228:1471). Click opens its
 * withdraw popup; the checkmark appears after a withdrawal is confirmed.
 */
export default function BenefitItemCard({
  name,
  total,
  disbursed = 0,
  used = 0,
  image,
  active = false,
  onClick,
  onEditWithdraw,
  onEditBenefit,
  onDelete,
}: BenefitItemCardProps) {
  // (6) entered → selected. Progress (4) tracks disbursed only.
  const selected = used > 0;
  const pct = total > 0 ? Math.min(100, (disbursed / total) * 100) : 0;
  const highlighted = active || selected;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the options menu on outside click / Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const runAction = (action?: () => void) => {
    setMenuOpen(false);
    action?.();
  };

  return (
    <div
      className={`bcard${highlighted ? " bcard--selected" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="bcard__top">
        <div className="bcard__thumb">
          {image && <img src={image} alt="" />}
        </div>
        <div className="bcard__main">
          <div className="bcard__title-row">
            <h3 className="bcard__title">{name}</h3>
            <span
              className={`bcard__checkbox${
                selected ? " bcard__checkbox--checked" : ""
              }`}
              aria-hidden="true"
            >
              {selected && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4.2 3.6 6.8 9 1.2"
                    stroke="#ffffff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </div>
          <div className="bcard__progress">
            <div className="bcard__amount">
              <span className="bcard__used">{fmt(disbursed)}</span>
              <span className="bcard__sep">/</span>
              <span className="bcard__total">{fmt(total)} THB</span>
            </div>
            <div className="bcard__bar">
              {pct > 0 && (
                <div className="bcard__bar-fill" style={{ width: `${pct}%` }} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bcard__foot">
        <div className="bcard__withdraw">
          <span className="bcard__withdraw-label">เบิกงบ</span>
          <span className="bcard__withdraw-amount">
            <span className="bcard__withdraw-value">
              {used > 0 ? used.toLocaleString("en-US") : "-"}
            </span>
            <span className="bcard__withdraw-unit">THB</span>
          </span>
        </div>
        <div className="bcard__menu-wrap" ref={menuRef}>
          <button
            className="bcard__menu"
            type="button"
            aria-label="ตัวเลือก"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((o) => !o);
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="19" cy="12" r="1.6" />
            </svg>
          </button>

          {menuOpen && (
            <div
              className="bcard__menu-dropdown"
              role="menu"
              onClick={(e) => e.stopPropagation()}
            >
              {/* "แก้ไขการเบิกงบ" — only for a selected card */}
              {selected && (
                <button
                  type="button"
                  className="bcard__menu-item"
                  role="menuitem"
                  onClick={() => runAction(onEditWithdraw)}
                >
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
                    <path d="M14.9997 8.33424L11.6664 5.0009M2.08301 17.9176L4.90331 17.6042C5.24789 17.5659 5.42018 17.5468 5.58121 17.4946C5.72408 17.4484 5.86005 17.383 5.98541 17.3004C6.12672 17.2072 6.2493 17.0846 6.49445 16.8395L17.4997 5.83424C18.4202 4.91376 18.4202 3.42138 17.4997 2.5009C16.5792 1.58043 15.0868 1.58043 14.1664 2.5009L3.16112 13.5061C2.91596 13.7513 2.79339 13.8739 2.70021 14.0152C2.61753 14.1405 2.55219 14.2765 2.50594 14.4194C2.4538 14.5804 2.43466 14.7527 2.39637 15.0973L2.08301 17.9176Z" />
                  </svg>
                  แก้ไขการเบิกงบ
                </button>
              )}

              {/* "แก้ไข Benefit" */}
              <button
                type="button"
                className="bcard__menu-item"
                role="menuitem"
                onClick={() => runAction(onEditBenefit)}
              >
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
              </button>

              <div className="bcard__menu-divider" />

              {/* "ลบ" */}
              <button
                type="button"
                className="bcard__menu-item bcard__menu-item--danger"
                role="menuitem"
                onClick={() => runAction(onDelete)}
              >
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
                  <path d="M7.5 2.5H12.5M2.5 5H17.5M15.8333 5L15.2489 13.7661C15.1612 15.0813 15.1174 15.7389 14.8333 16.2375C14.5833 16.6765 14.206 17.0294 13.7514 17.2497C13.235 17.5 12.5759 17.5 11.2578 17.5H8.74221C7.42409 17.5 6.76503 17.5 6.24861 17.2497C5.79396 17.0294 5.41674 16.6765 5.16665 16.2375C4.88259 15.7389 4.83875 15.0813 4.75107 13.7661L4.16667 5M8.33333 8.75V12.9167M11.6667 8.75V12.9167" />
                </svg>
                ลบ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
