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
  | "menu"
  | "cloud-upload";

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
    <path
      fill="currentColor"
      stroke="none"
      d="M12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H8.2C8.48003 21 8.62004 21 8.727 20.9455C8.82108 20.8976 8.89757 20.8211 8.9455 20.727C9 20.62 9 20.48 9 20.2V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V20.2C15 20.48 15 20.62 15.0545 20.727C15.1024 20.8211 15.1789 20.8976 15.273 20.9455C15.38 21 15.52 21 15.8 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764Z"
    />
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
  "cloud-upload": (
    <>
      <path d="M7 18a4.5 4.5 0 1 1 .87-8.92 5 5 0 0 1 9.65 1.92A3.5 3.5 0 0 1 17 18" />
      <path d="M12 21v-8M8.5 16.5 12 13l3.5 3.5" />
    </>
  ),
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
