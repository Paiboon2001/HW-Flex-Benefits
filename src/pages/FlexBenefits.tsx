import { useRef, useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BenefitCard from "../components/BenefitCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import CreateBenefitModal, {
  type NewBenefit,
} from "../components/CreateBenefitModal";
import BenefitItemCard, { type Benefit } from "../components/BenefitItemCard";
import WithdrawModal from "../components/WithdrawModal";
import SummaryBar from "../components/SummaryBar";
import SummaryPage from "../components/SummaryPage";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";
import "./FlexBenefits.css";

/**
 * Flex Benefits home page — implemented from Figma "Automated"
 * (desktop 228:1744, tablet 228:1654, mobile 228:1565).
 * Single responsive page: sidebar collapses to a drawer below 1024px.
 */
/** Total starting Flex Benefits budget (position 3 on the banner). */
const INITIAL_BUDGET = 15000;

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function FlexBenefits() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [withdrawId, setWithdrawId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(
    "คุณได้ทำการสร้างกระเป๋า Benefit สำเร็จแล้ว"
  );
  const [toastVariant, setToastVariant] = useState<"success" | "error">(
    "success"
  );
  // Banner figures change ONLY when a request is submitted from the summary —
  // creating/withdrawing/editing benefits never touches them.
  const [bankUsed, setBankUsed] = useState(0);
  const idRef = useRef(0);

  const withdrawBenefit = benefits.find((b) => b.id === withdrawId);
  const editBenefit = benefits.find((b) => b.id === editId) ?? null;

  // Banner: used (1) = total disbursed via submitted requests,
  //         remaining (2) = initial (3) − used, total (3) = initial.
  const remaining = INITIAL_BUDGET - bankUsed;
  const [usedWhole, usedDecimal] = fmtMoney(bankUsed).split(".") as [
    string,
    string,
  ];

  // Allocation limit (separate from the banner): total budget across all
  // created cards (5) can't exceed the initial budget.
  const allocated = benefits.reduce((sum, b) => sum + b.total, 0);

  // A benefit is selected once a withdrawal (6) has been entered (used > 0).
  const selected = benefits.filter((b) => (b.used ?? 0) > 0);
  const selectedTotal = selected.reduce((sum, b) => sum + (b.used ?? 0), 0);

  // Click a card: if it already has a pending withdrawal → unselect (clear it);
  // otherwise open its withdraw popup.
  const handleCardClick = (b: Benefit) => {
    if ((b.used ?? 0) > 0) {
      setBenefits((prev) =>
        prev.map((x) => (x.id === b.id ? { ...x, used: 0 } : x))
      );
    } else {
      setWithdrawId(b.id);
    }
  };

  const handleSave = (data: NewBenefit) => {
    if (editId) {
      // Edit: update the existing benefit, keep its withdrawal/checked state,
      // then return to its withdraw popup.
      setBenefits((prev) =>
        prev.map((b) =>
          b.id === editId
            ? { ...b, name: data.name, total: data.total, image: data.image }
            : b
        )
      );
      setWithdrawId(editId);
      setEditId(null);
    } else {
      setBenefits((prev) => [
        ...prev,
        { id: `b${(idRef.current += 1)}`, used: 0, ...data },
      ]);
      setToastVariant("success");
      setToastMsg("คุณได้ทำการสร้างกระเป๋า Benefit สำเร็จแล้ว");
      setToastOpen(true);
      setCreateOpen(false);
    }
  };

  const handleSubmitRequest = () => {
    // Only now does the banner change: add the requested withdrawals to the
    // disbursed total, then clear the submitted (checked) benefits.
    setBankUsed((prev) => prev + selectedTotal);
    setBenefits((prev) =>
      prev.map((b) =>
        (b.used ?? 0) > 0
          ? { ...b, disbursed: (b.disbursed ?? 0) + (b.used ?? 0), used: 0 }
          : b
      )
    );
    setConfirmOpen(false);
    setShowSummary(false);
    setToastVariant("success");
    setToastMsg("ส่งคำขอเบิกงบ Benefit สำเร็จแล้ว");
    setToastOpen(true);
  };

  const closeBenefitModal = () => {
    if (editId) {
      // Editing came from the withdraw popup → go back to it.
      setWithdrawId(editId);
      setEditId(null);
    } else {
      setCreateOpen(false);
    }
  };

  return (
    <div className="flex-benefits">
      <Topbar onMenuClick={() => setDrawerOpen(true)} />

      <div className="flex-benefits__body">
        <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <main className="flex-benefits__main">
          {showSummary ? (
            <SummaryPage
              benefits={selected}
              remaining={remaining}
              onBack={() => setShowSummary(false)}
              onSubmit={() => setConfirmOpen(true)}
            />
          ) : (
          <>
          <header className="flex-benefits__head">
            <h1 className="flex-benefits__title">Flex Benefits</h1>
            <div className="flex-benefits__hint">
              <span
                className="flex-benefits__hint-trigger"
                tabIndex={0}
                role="button"
                aria-label="ยอดเงิน Benefits จะถูกรีเซ็ตในวันสุดท้ายของรอบที่กำหนด"
              >
                <svg
                  className="flex-benefits__hint-icon"
                  width="20"
                  height="20"
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
                <span className="flex-benefits__tooltip" role="tooltip">
                  ยอดเงิน Benefits จะถูกรีเซ็ตในวันสุดท้ายของรอบที่กำหนด
                </span>
              </span>
              <span className="flex-benefits__hint-text">
                ยอดเงิน Benefits จะถูกรีเซ็ตในวันสุดท้ายของรอบที่กำหนด
              </span>
            </div>
          </header>

          <div className="flex-benefits__content">
            <BenefitCard
              usedWhole={usedWhole}
              usedDecimal={`.${usedDecimal}`}
              remaining={fmtMoney(remaining)}
              total={fmtMoney(INITIAL_BUDGET)}
            />

            <section className="flex-benefits__section-head">
              <h2 className="flex-benefits__section-title">Benefits ของฉัน</h2>
              <div className="flex-benefits__actions">
                <Button variant="outline">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 8.11064L3.54166 9.89311L5.32466 8.35099M3.32281 9.45953C3.62148 5.32818 7.21272 2.22118 11.3441 2.51985C15.4754 2.81852 18.5824 6.40977 18.2838 10.5411C17.9851 14.6725 14.3938 17.7795 10.2625 17.4808C7.51805 17.2824 5.22566 15.631 4.08336 13.3335M10.4008 6.37675L10.2625 10.5411L12.7058 12.2899"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="flex-benefits__btn-text">ประวัติการเบิกงบ</span>
                </Button>
                <Button variant="primary" onClick={() => setCreateOpen(true)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.99984 4.16663V15.8333M4.1665 9.99996H15.8332"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="flex-benefits__btn-text">สร้าง Benefit</span>
                  <span className="flex-benefits__btn-text-short">สร้าง</span>
                </Button>
              </div>
            </section>

            {benefits.length === 0 ? (
              <div className="flex-benefits__empty">
                <EmptyState onCreate={() => setCreateOpen(true)} />
              </div>
            ) : (
              <div className="flex-benefits__grid">
                {benefits.map((b) => (
                  <BenefitItemCard
                    key={b.id}
                    name={b.name}
                    total={b.total}
                    disbursed={b.disbursed}
                    used={b.used}
                    image={b.image}
                    active={withdrawId === b.id}
                    onClick={() => handleCardClick(b)}
                  />
                ))}
              </div>
            )}
          </div>

          {selected.length > 0 && (
            <SummaryBar
              count={selected.length}
              total={selectedTotal}
              onSubmit={() => setShowSummary(true)}
            />
          )}
          </>
          )}
        </main>
      </div>

      <CreateBenefitModal
        open={createOpen || editId != null}
        onClose={closeBenefitModal}
        onSave={handleSave}
        maxAmount={
          editBenefit
            ? INITIAL_BUDGET - allocated + editBenefit.total
            : INITIAL_BUDGET - allocated
        }
        initial={
          editBenefit
            ? {
                name: editBenefit.name,
                total: editBenefit.total,
                image: editBenefit.image ?? null,
              }
            : null
        }
      />

      <WithdrawModal
        open={withdrawBenefit != null}
        name={withdrawBenefit?.name ?? ""}
        total={withdrawBenefit?.total ?? 0}
        disbursed={withdrawBenefit?.disbursed ?? 0}
        image={withdrawBenefit?.image}
        onClose={() => setWithdrawId(null)}
        onEdit={() => {
          // A fully-disbursed benefit can't be edited.
          if (
            withdrawBenefit &&
            (withdrawBenefit.disbursed ?? 0) >= withdrawBenefit.total
          ) {
            setToastVariant("error");
            setToastMsg(
              "ไม่สามารถแก้ไขข้อมูลได้ เนื่องจากเบิกเงินเต็มจำนวนแล้ว"
            );
            setToastOpen(true);
            return;
          }
          // Go edit this benefit (pre-filled), can save back.
          setEditId(withdrawId);
          setWithdrawId(null);
        }}
        onConfirm={(amount) => {
          setBenefits((prev) =>
            prev.map((b) =>
              b.id === withdrawId ? { ...b, used: amount } : b
            )
          );
          setWithdrawId(null);
        }}
      />

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleSubmitRequest}
      />

      <Toast
        open={toastOpen}
        message={toastMsg}
        variant={toastVariant}
        onClose={() => setToastOpen(false)}
      />
    </div>
  );
}
