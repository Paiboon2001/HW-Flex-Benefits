import Icon, { type IconName } from "./Icon";
import "./Sidebar.css";

interface NavItem {
  label: string;
  icon: IconName;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Other", icon: "home" },
  { label: "Flex Benefits", icon: "coins-hand", active: true },
  { label: "Other", icon: "home" },
  { label: "Other", icon: "home" },
  { label: "Other", icon: "home" },
  { label: "Other", icon: "home" },
];

interface SidebarProps {
  /** Drawer open state (tablet / mobile). Always visible on desktop. */
  open?: boolean;
  /** Close the drawer (tablet / mobile). */
  onClose?: () => void;
}

/**
 * Left navigation. Fixed column on desktop; slide-in drawer on tablet/mobile.
 */
export default function Sidebar({ open = false, onClose }: SidebarProps) {
  return (
    <>
      <div
        className={`sidebar__scrim${open ? " sidebar__scrim--open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar${open ? " sidebar--open" : ""}`}>
        <div className="sidebar__head">
          <span className="sidebar__title">Employee View</span>
          <button
            className="sidebar__collapse"
            type="button"
            aria-label="ย่อเมนู"
            onClick={onClose}
          >
            <Icon name="layout-right" size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={i}
              href="#"
              className={`sidebar__item${
                item.active ? " sidebar__item--active" : ""
              }`}
            >
              <span className="sidebar__item-main">
                <Icon name={item.icon} size={24} className="sidebar__item-icon" />
                <span className="sidebar__item-label">{item.label}</span>
              </span>
              {!item.active && (
                <Icon name="chevron-right" size={20} className="sidebar__item-caret" />
              )}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
}
