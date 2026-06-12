import Icon from "./Icon";
import "./Topbar.css";

interface TopbarProps {
  /** User display name shown in the desktop chip. */
  userName?: string;
  /** Sub-label under the name (e.g. position). */
  userRole?: string;
  /** Called when the hamburger (mobile / tablet) is tapped. */
  onMenuClick?: () => void;
}

/**
 * Top navigation bar — HappyWork logo on the left, a user chip on desktop
 * and a hamburger button on tablet / mobile.
 */
export default function Topbar({
  userName = "ไพบูลย์ แก้วมงคล",
  userRole = "ไม่มีตำแหน่ง",
  onMenuClick,
}: TopbarProps) {
  return (
    <header className="topbar">
      <a className="topbar__brand" href="#" aria-label="HappyWork">
        <img src="/assets/logo%20Happywork.png" alt="HappyWork" />
      </a>

      {/* Desktop: user chip */}
      <button className="topbar__user" type="button">
        <span className="topbar__avatar" aria-hidden="true">
          {/* user-02 icon (Figma 235:3421) */}
          <svg
            className="topbar__avatar-user"
            width="13"
            height="14"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 8.33333C4.1034 8.33333 2.41677 9.26872 1.34297 10.7203C1.11186 11.0327 0.99631 11.1889 1.00009 11.4001C1.00301 11.5632 1.10328 11.7689 1.22893 11.8696C1.39155 12 1.61691 12 2.06764 12H9.93236C10.3831 12 10.6084 12 10.7711 11.8696C10.8967 11.7689 10.997 11.5632 10.9999 11.4001C11.0037 11.1889 10.8881 11.0327 10.657 10.7203C9.58323 9.26872 7.8966 8.33333 6 8.33333Z" fill="#8094AD" />
            <path d="M6 6.5C7.4869 6.5 8.69227 5.26878 8.69227 3.75C8.69227 2.23122 7.4869 1 6 1C4.5131 1 3.30773 2.23122 3.30773 3.75C3.30773 5.26878 4.5131 6.5 6 6.5Z" fill="#8094AD" />
            <path d="M6 8.33333C4.1034 8.33333 2.41677 9.26872 1.34297 10.7203C1.11186 11.0327 0.99631 11.1889 1.00009 11.4001C1.00301 11.5632 1.10328 11.7689 1.22893 11.8696C1.39155 12 1.61691 12 2.06764 12H9.93236C10.3831 12 10.6084 12 10.7711 11.8696C10.8967 11.7689 10.997 11.5632 10.9999 11.4001C11.0037 11.1889 10.8881 11.0327 10.657 10.7203C9.58323 9.26872 7.8966 8.33333 6 8.33333Z" stroke="#8094AD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6.5C7.4869 6.5 8.69227 5.26878 8.69227 3.75C8.69227 2.23122 7.4869 1 6 1C4.5131 1 3.30773 2.23122 3.30773 3.75C3.30773 5.26878 4.5131 6.5 6 6.5Z" stroke="#8094AD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* building-05 company badge (Figma 235:3422) */}
          <span className="topbar__avatar-badge">
            <svg
              width="11"
              height="10"
              viewBox="0 0 11 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 4.5H8.4C8.96005 4.5 9.24008 4.5 9.45399 4.60899C9.64215 4.70487 9.79513 4.85785 9.89101 5.04601C10 5.25992 10 5.53995 10 6.1V9.5M6 9.5V2.1C6 1.53995 6 1.25992 5.89101 1.04601C5.79513 0.857847 5.64215 0.704867 5.45399 0.608993C5.24008 0.5 4.96005 0.5 4.4 0.5H2.6C2.03995 0.5 1.75992 0.5 1.54601 0.608993C1.35785 0.704867 1.20487 0.857847 1.10899 1.04601C1 1.25992 1 1.53995 1 2.1V9.5M10.5 9.5H0.5M2.75 2.5H4.25M2.75 4.5H4.25M2.75 6.5H4.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        <span className="topbar__user-meta">
          <span className="topbar__user-name">{userName}</span>
          <span className="topbar__user-role">{userRole}</span>
        </span>
        <Icon name="chevron-down" size={20} className="topbar__user-caret" />
      </button>

      {/* Tablet / mobile: hamburger */}
      <button
        className="topbar__menu"
        type="button"
        aria-label="เปิดเมนู"
        onClick={onMenuClick}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" fill="#F5F6FF" />
          <rect x="0.5" y="0.5" width="31" height="31" rx="3.5" stroke="#E1E6EC" />
          <path
            d="M7 16H25M7 10H25M7 22H25"
            stroke="#777B92"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </header>
  );
}
