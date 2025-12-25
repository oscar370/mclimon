import Button from "@/components/Button";
import { tutorialsIndex } from "@/data/tutorials";
import { useNavigate } from "react-router-dom";

type SidebarButtonsProps = {
  toggleSidebar: () => void;
};

export default function SidebarButtons({ toggleSidebar }: SidebarButtonsProps) {
  const navigate = useNavigate();
  const currentPath = location.pathname;

  function handleGoTo(to: string) {
    navigate(to);
    toggleSidebar();
  }

  function getNavState(tutorialName: string) {
    return currentPath === `/tutorials/${tutorialName}` ? "active" : "normal";
  }

  return (
    <div className="space-y-1 px-2 py-12">
      {tutorialsIndex.map(({ name, label }) => (
        <Button
          key={name}
          variant="nav"
          state={getNavState(name)}
          onClick={() => handleGoTo(`/tutorials/${name}`)}
          className="flex w-full justify-start"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
