import "./BenefitItemCard.css";

export interface Benefit {
  id: string;
  name: string;
  total: number;
  used?: number;
  image?: string | null;
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/**
 * A single created Benefit card — implemented from Figma "Card Benefit01"
 * (228:2266). Shown after a benefit is saved.
 */
export default function BenefitItemCard({
  name,
  total,
  used = 0,
  image,
}: Omit<Benefit, "id">) {
  const pct = total > 0 ? Math.min(100, (used / total) * 100) : 0;

  return (
    <div className="bcard">
      <div className="bcard__top">
        <div className="bcard__thumb">
          {image && <img src={image} alt="" />}
        </div>
        <div className="bcard__main">
          <div className="bcard__title-row">
            <h3 className="bcard__title">{name}</h3>
            <span className="bcard__checkbox" aria-hidden="true" />
          </div>
          <div className="bcard__progress">
            <div className="bcard__amount">
              <span className="bcard__used">{fmt(used)}</span>
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
            <span className="bcard__withdraw-value">-</span>
            <span className="bcard__withdraw-unit">THB</span>
          </span>
        </div>
        <button className="bcard__menu" type="button" aria-label="ตัวเลือก">
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
