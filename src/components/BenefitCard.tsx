import "./BenefitCard.css";

interface BenefitCardProps {
  /** Whole-baht part of the used amount (e.g. "0"). */
  usedWhole?: string;
  /** Decimal part incl. dot (e.g. ".00"). */
  usedDecimal?: string;
  /** Remaining budget, formatted. */
  remaining?: string;
  /** Total budget, formatted. */
  total?: string;
  /** Cycle label (e.g. "รอบปี"). */
  cycle?: string;
}

/**
 * Gradient budget banner — shows used / remaining Flex Benefits budget
 * with the HappyWork emoji cluster.
 */
export default function BenefitCard({
  usedWhole = "0",
  usedDecimal = ".00",
  remaining = "15,000.00",
  total = "15,000.00",
  cycle = "รอบปี",
}: BenefitCardProps) {
  return (
    <div className="benefit-card">
      {/* Decorative flowing blob overlays (Figma mask groups 240:3488 / 240:3498) */}
      <img className="benefit-card__swirl benefit-card__swirl--1" src="/assets/card-blob-1.svg" alt="" aria-hidden="true" />
      <img className="benefit-card__swirl benefit-card__swirl--2" src="/assets/card-blob-2.svg" alt="" aria-hidden="true" />

      {/* Emoji cluster */}
      <div className="benefit-card__emojis" aria-hidden="true">
        <img className="emoji emoji--laugh" src="/assets/emoji-laugh.gif" alt="" />
        <img className="emoji emoji--sad" src="/assets/emoji-sad.gif" alt="" />
        <img className="emoji emoji--green" src="/assets/emoji-green.gif" alt="" />
        <img className="emoji emoji--happy" src="/assets/emoji-happy.gif" alt="" />
        <img className="emoji emoji--blue" src="/assets/emoji-blue.gif" alt="" />
      </div>

      <div className="benefit-card__body">
        <div className="benefit-card__upper">
          <div className="benefit-card__top">
            <div className="benefit-card__label-row">
              <span className="benefit-card__label">งบประมาณ Benefits ที่ใช้ไป</span>
              <svg
              className="benefit-card__info"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99984 13.3333V9.99996M9.99984 6.66663H10.0082M18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            </div>
            <span className="benefit-card__cycle">
              <span className="benefit-card__cycle-key">รอบ:</span>
              <span className="benefit-card__cycle-val">{cycle}</span>
            </span>
          </div>

          <div className="benefit-card__used">
            <span className="benefit-card__used-amount">
              <span className="benefit-card__used-whole">{usedWhole}</span>
              <span className="benefit-card__used-decimal">{usedDecimal}</span>
            </span>
            <span className="benefit-card__used-unit">THB</span>
          </div>
        </div>

        <div className="benefit-card__bottom">
          <div className="benefit-card__label-row">
            <span className="benefit-card__sublabel">งบประมาณคงเหลือ</span>
            <svg
              className="benefit-card__info"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99984 13.3333V9.99996M9.99984 6.66663H10.0082M18.3332 9.99996C18.3332 14.6023 14.6022 18.3333 9.99984 18.3333C5.39746 18.3333 1.6665 14.6023 1.6665 9.99996C1.6665 5.39759 5.39746 1.66663 9.99984 1.66663C14.6022 1.66663 18.3332 5.39759 18.3332 9.99996Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="benefit-card__remaining">
            <span className="benefit-card__remaining-now">{remaining}</span>
            <span className="benefit-card__remaining-sep">/</span>
            <span className="benefit-card__remaining-total">{total}</span>
            <span className="benefit-card__remaining-unit">THB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
