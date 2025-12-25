type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variants;
  state?: VariantsState;
  className?: string;
};

type Variants = keyof typeof VARIANT_STYLES;

type VariantsState = "active" | "normal";

const VARIANT_STYLES = {
  primary: {
    active: "",
    normal: "bg-(--primary) hover:bg-(--primary)/70",
  },
  nav: {
    active: "bg-(--secondary)",
    normal: "hover:bg-(--secondary)/70",
  },
  flat: {
    active: "font-bold",
    normal: "",
  },
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  state = "normal",
  className = "",
}: ButtonProps) {
  const styles = VARIANT_STYLES[variant][state];

  return (
    <button
      className={`cursor-pointer rounded-lg px-3 py-2 transition-colors ${styles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
