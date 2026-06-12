/**
 * Inline SVG icon set used across the Flex Benefits UI.
 * All icons are 24x24 viewBox, stroke = currentColor, so size/color
 * are controlled via CSS (font-size / color or width/height).
 */

export type IconName =
  | "info"
  | "chevron-down"
  | "chevron-right"
  | "plus"
  | "clock-rewind"
  | "home"
  | "coins-hand"
  | "layout-right"
  | "user"
  | "menu";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const PATHS: Record<IconName, React.ReactNode> = {
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </>
  ),
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  "clock-rewind": (
    <>
      <path d="M3 9a9 9 0 1 1 .5 3" />
      <path d="M3 4v5h5" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9.5 20v-6h5v6" />
    </>
  ),
  "coins-hand": (
    <>
      <circle cx="9" cy="7.5" r="3.5" />
      <path d="M3 21v-1a4 4 0 0 1 4-4h2" />
      <path d="M12.5 14.5h4l3 1.5c.8.5.6 1.8-.4 2l-4.6.9a4 4 0 0 1-2-.2L9 17.5" />
    </>
  ),
  "layout-right": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M15 4v16" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

export default function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 1.6,
}: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
