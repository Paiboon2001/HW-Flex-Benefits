import { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import BenefitCard from "../components/BenefitCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import Icon from "../components/Icon";
import "./FlexBenefits.css";

/**
 * Flex Benefits home page — implemented from Figma "Automated"
 * (desktop 228:1744, tablet 228:1654, mobile 228:1565).
 * Single responsive page: sidebar collapses to a drawer below 1024px.
 */
export default function FlexBenefits() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex-benefits">
      <Topbar onMenuClick={() => setDrawerOpen(true)} />

      <div className="flex-benefits__body">
        <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <main className="flex-benefits__main">
          <header className="flex-benefits__head">
            <h1 className="flex-benefits__title">Flex Benefits</h1>
            <div className="flex-benefits__hint">
              <Icon name="info" size={20} className="flex-benefits__hint-icon" />
              <span className="flex-benefits__hint-text">
                ยอดเงิน Benefits จะถูกรีเซ็ตในวันสุดท้ายของรอบที่กำหนด
              </span>
            </div>
          </header>

          <div className="flex-benefits__content">
            <BenefitCard />

            <section className="flex-benefits__section-head">
              <h2 className="flex-benefits__section-title">Benefits ของฉัน</h2>
              <div className="flex-benefits__actions">
                <Button variant="outline">
                  <Icon name="clock-rewind" size={20} />
                  <span className="flex-benefits__btn-text">ประวัติการเบิกงบ</span>
                </Button>
                <Button variant="primary">
                  <Icon name="plus" size={20} />
                  <span className="flex-benefits__btn-text">สร้าง Benefit</span>
                  <span className="flex-benefits__btn-text-short">สร้าง</span>
                </Button>
              </div>
            </section>

            <div className="flex-benefits__empty">
              <EmptyState />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
