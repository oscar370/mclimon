import { requestSidebarToggle } from "@/stores/sidebar";
import { PanelLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

type NavBarProps = {
  showSidebarToggle?: boolean;
};

export function NavBar({ showSidebarToggle = false }: NavBarProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {showSidebarToggle && (
          <NavigationMenuItem className="[view-transition-name:navbar-toggle]">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle sidebar"
              onClick={requestSidebarToggle}
            >
              <PanelLeftIcon />
            </Button>
          </NavigationMenuItem>
        )}

        <NavigationMenuItem className="[view-transition-name:navbar-home]">
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<a href="/" />}
          >
            <span className="font-pixelify">Inicio</span>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="[view-transition-name:navbar-tutorials]">
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<a href="/tutorials" />}
          >
            <span className="font-pixelify">Tutoriales</span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
