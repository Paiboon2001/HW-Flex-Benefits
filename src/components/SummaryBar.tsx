import "./SummaryBar.css";

interface SummaryBarProps {
  /** Number of selected (checked) benefits. */
  count: number;
  /** Total withdrawal amount of the selected benefits. */
  total: number;
  onSubmit?: () => void;
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/**
 * Bottom summary bar — implemented from Figma (228:2631).
 * Shows the count + total of selected benefits with the submit action.
 */
export default function SummaryBar({ count, total, onSubmit }: SummaryBarProps) {
  return (
    <div className="summary-bar">
      <div className="summary-bar__info">
        <div className="summary-bar__selected">
          <span className="summary-bar__label">รายการที่เลือก</span>
          <span className="summary-bar__count">{count}</span>
          <span className="summary-bar__colon">:</span>
        </div>
        <div className="summary-bar__amount">
          <span className="summary-bar__total">{fmt(total)}</span>
          <span className="summary-bar__unit">THB</span>
        </div>
      </div>

      <button className="summary-bar__submit" type="button" onClick={onSubmit}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path
            d="m8.5 12 2.5 2.5 4.5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        สรุปคำขอ Benefit
      </button>
    </div>
  );
}
