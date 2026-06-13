import type { Benefit } from "./BenefitItemCard";
import "./SummaryPage.css";

interface SummaryPageProps {
  /** Selected benefits being requested. */
  benefits: Benefit[];
  /** Remaining budget before this request. */
  remaining: number;
  onBack: () => void;
  onSubmit: () => void;
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const TH_MONTHS = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

const fmtThaiDate = (d: Date) =>
  `${d.getDate()} ${TH_MONTHS[d.getMonth()]} ${String(
    (d.getFullYear() + 543) % 100
  ).padStart(2, "0")}`;

/**
 * "สรุปคำขอการเบิกงบ Benefits" page content — Figma (228:461).
 * Rendered inside the Flex Benefits main area (reuses Topbar + Sidebar).
 */
export default function SummaryPage({
  benefits,
  remaining,
  onBack,
  onSubmit,
}: SummaryPageProps) {
  const totalWithdraw = benefits.reduce((sum, b) => sum + (b.used ?? 0), 0);
  const afterRemaining = remaining - totalWithdraw;

  const today = new Date();
  const expected = new Date(today);
  expected.setDate(expected.getDate() + 3);

  return (
    <>
      <header className="summary__head">
        <div className="summary__head-left">
          <button
            className="summary__back"
            type="button"
            aria-label="ย้อนกลับ"
            onClick={onBack}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="m15 6-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="summary__title">สรุปคำขอการเบิกงบ Benefits</h1>
        </div>
        <nav className="summary__breadcrumb">
          <button type="button" className="summary__crumb" onClick={onBack}>
            Flex Benefits
          </button>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="m9 6 6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="summary__crumb summary__crumb--active">
            สรุปคำขอการเบิกงบ Benefits
          </span>
        </nav>
      </header>

      <div className="summary__body">
        <div className="summary-card">
          <div className="summary-card__content">
            <div className="summary-card__group summary-card__group--dashed">
              {/* Requested benefits */}
              <div className="summary-card__benefits">
                {benefits.map((b) => (
                  <div key={b.id} className="summary-row">
                    <div className="summary-row__thumb">
                      {b.image && <img src={b.image} alt="" />}
                    </div>
                    <div className="summary-row__detail">
                      <p className="summary-row__name">{b.name}</p>
                      <p className="summary-row__budget">
                        <span className="summary-row__used">
                          {fmt(b.disbursed ?? 0)}
                        </span>
                        <span className="summary-row__sep">/</span>
                        <span className="summary-row__total">
                          {fmt(b.total)} THB
                        </span>
                      </p>
                    </div>
                    <div className="summary-row__badge">
                      <span className="summary-row__baht">฿</span>
                      <span className="summary-row__amount">
                        {fmt(b.used ?? 0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="summary-card__totals">
                <div className="summary-line summary-line--head">
                  <span className="summary-line__label">สรุปยอดคำขอ</span>
                  <span className="summary-line__value">
                    <strong className="summary-line__count">
                      {benefits.length}
                    </strong>
                    <span className="summary-line__unit">รายการ</span>
                  </span>
                </div>

                <div className="summary-line summary-line--indent">
                  <span className="summary-line__text">งบประมาณคงเหลือ</span>
                  <span className="summary-line__value">
                    <span className="summary-line__num">{fmt(remaining)}</span>
                    <span className="summary-line__unit">THB</span>
                  </span>
                </div>

                {benefits.map((b) => (
                  <div
                    key={b.id}
                    className="summary-line summary-line--indent"
                  >
                    <span className="summary-line__text">เบิก{b.name}</span>
                    <span className="summary-line__value">
                      <span className="summary-line__num summary-line__num--minus">
                        -{fmt(b.used ?? 0)}
                      </span>
                      <span className="summary-line__unit">THB</span>
                    </span>
                  </div>
                ))}

                <div className="summary-line summary-line--indent">
                  <span className="summary-line__text">คงเหลือ</span>
                  <span className="summary-line__value">
                    <span className="summary-line__num">
                      {fmt(afterRemaining)}
                    </span>
                    <span className="summary-line__unit">THB</span>
                  </span>
                </div>

                <div className="summary-line summary-line--head">
                  <span className="summary-line__label">
                    งบ Benefit ที่จะได้รับ
                  </span>
                  <span className="summary-line__value">
                    <span className="summary-line__num summary-line__num--plus">
                      +{totalWithdraw.toLocaleString("en-US")}
                    </span>
                    <span className="summary-line__unit">THB</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="summary-card__group summary-card__group--solid">
              <div className="summary-line">
                <span className="summary-line__text">วันที่ส่งคำขอ</span>
                <span className="summary-line__date">{fmtThaiDate(today)}</span>
              </div>
              <div className="summary-line">
                <span className="summary-line__text">
                  วันที่คาดว่าจะได้รับเงินประมาณ
                </span>
                <span className="summary-line__date">
                  {fmtThaiDate(expected)}
                </span>
              </div>
            </div>

            {/* Payout channel */}
            <div className="summary-card__group">
              <div className="summary-line">
                <span className="summary-line__label">ช่องทางการรับเงิน</span>
                <button type="button" className="summary-card__manage">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  จัดการบัญชี
                </button>
              </div>
              <div className="summary-line">
                <span className="summary-card__bank">
                  <img src="/assets/kplus.png" alt="" />
                  K PLUS
                </span>
                <span className="summary-line__account">96* **** *08</span>
              </div>
            </div>

            <div className="summary-card__note">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9.99984 13.3333V9.99996M9.99984 6.66663H10.0082M18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                คุณสามารถแก้ไขสวัสดิการที่เลือกไว้ได้ก่อนดำเนินการส่งคำขอเบิกเงิน
              </span>
            </div>
          </div>

          <div className="summary-card__foot">
            <button
              type="button"
              className="summary-card__submit"
              onClick={onSubmit}
            >
              ส่งคำขอ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
