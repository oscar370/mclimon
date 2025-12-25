import { motion } from "motion/react";

type NavBarProps = {
  children: React.ReactNode;
  variant?: "float" | "block";
};

export default function NavBar({ children, variant = "float" }: NavBarProps) {
  const isFloat = variant === "float";
  const wrapperStyles = isFloat ? "absolute z-5 py-2" : "";
  const contentStyles = isFloat ? " shadow-2xl " : "";

  return (
    <div className={`w-full ${wrapperStyles}`}>
      <motion.nav
        className={`mx-auto flex items-center justify-center gap-2 border border-black/5 bg-(--background) px-3.5 py-2 ${contentStyles}`}
        layout
        initial={false}
        animate={isFloat ? "float" : "block"}
        variants={{
          float: {
            width: "fit-content",
            borderRadius: "1rem",
          },
          block: {
            width: "100%",
            borderRadius: "0rem",
          },
        }}
      >
        {children}
      </motion.nav>
    </div>
  );
}
