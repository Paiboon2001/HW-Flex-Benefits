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
        <img src="/assets/hw-logo.png" alt="HappyWork" />
      </a>

      {/* Desktop: user chip */}
      <button className="topbar__user" type="button">
        <span className="topbar__avatar" aria-hidden="true">
          <Icon name="user" size={20} />
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
        <Icon name="menu" size={24} />
      </button>
    </header>
  );
}
