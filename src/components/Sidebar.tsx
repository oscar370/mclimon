import { motion } from "motion/react";
import { createContext, useContext, useEffect, useState } from "react";

type SidebarProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggleSidebar: () => void;
};

type TSidebarContext = Pick<SidebarProps, "isOpen" | "toggleSidebar">;

const SidebarContext = createContext<TSidebarContext | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("The SidebarContext is needed");
  }

  return context;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return {
    isMobile,
  };
}

export default function Sidebar({
  children,
  isOpen,
  toggleSidebar,
}: SidebarProps) {
  return (
    <SidebarContext value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext>
  );
}

Sidebar.Panel = function Panel({ children }: Pick<SidebarProps, "children">) {
  const { isOpen } = useSidebar();
  const { isMobile } = useIsMobile();

  return (
    <motion.nav
      className="fixed min-h-dvh w-full border-r border-black/5 bg-(--background) sm:static!"
      initial={false}
      animate={isMobile && !isOpen ? "close" : "open"}
      variants={{
        open: { x: 0 },
        close: { x: "-100%" },
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      aria-hidden={isMobile ? !isOpen : false}
      inert={isMobile && !isOpen ? true : undefined}
    >
      {children}
    </motion.nav>
  );
};

Sidebar.ToggleButton = function ToggleButton() {
  const { toggleSidebar } = useSidebar();

  return (
    <button className="block sm:hidden" onClick={toggleSidebar}>
      <svg
        height="16px"
        viewBox="0 0 16 16"
        width="16px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <path
            d="m 6 13 v -10 h -3 c -0.550781 0 -1 0.449219 -1 1 v 8 c 0 0.550781 0.449219 1 1 1 z m 0 0"
            fillOpacity="0.34902"
          />
          <path d="m 3 1 c -1.644531 0 -3 1.355469 -3 3 v 8 c 0 1.644531 1.355469 3 3 3 h 10 c 1.644531 0 3 -1.355469 3 -3 v -8 c 0 -1.644531 -1.355469 -3 -3 -3 z m 0 2 h 3 v 10 h -3 c -0.570312 0 -1 -0.429688 -1 -1 v -8 c 0 -0.570312 0.429688 -1 1 -1 z m 4 0 h 6 c 0.570312 0 1 0.429688 1 1 v 8 c 0 0.570312 -0.429688 1 -1 1 h -6 z m 0 0" />
        </g>
      </svg>
    </button>
  );
};
