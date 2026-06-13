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
}: BenefitItemCardProps) {
  // (6) entered → selected. Progress (4) tracks disbursed only.
  const selected = used > 0;
  const pct = total > 0 ? Math.min(100, (disbursed / total) * 100) : 0;
  const highlighted = active || selected;

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
        <button
          className="bcard__menu"
          type="button"
          aria-label="ตัวเลือก"
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="19" cy="12" r="1.6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
