import "./Button.css";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/**
 * Reusable button. `primary` = green CTA (สร้าง Benefit),
 * `outline` = white bordered (ประวัติการเบิกงบ).
 */
export default function Button({
  variant = "primary",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant}${className ? ` ${className}` : ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
