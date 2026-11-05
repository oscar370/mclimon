import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { $sidebarOpen, onSidebarToggleRequest } from "@/stores/sidebar";
import { useStore } from "@nanostores/react";
import * as React from "react";

function SidebarToggleBridge() {
  const { toggleSidebar } = useSidebar();

  React.useEffect(() => onSidebarToggleRequest(toggleSidebar), [toggleSidebar]);

  return null;
}

type Item = {
  id: string;
  title: string;
  href: string;
};

type TutorialsSidebarProps = {
  items: Item[];
  currentId: string;
  children?: React.ReactNode;
};

export function TutorialsSidebar({
  items,
  currentId,
  children,
}: TutorialsSidebarProps) {
  const open = useStore($sidebarOpen);

  return (
    <SidebarProvider
      open={open}
      onOpenChange={(value) => $sidebarOpen.set(value)}
      style={
        {
          "--sidebar-width": "var(--tutorials-sidebar-width)",
        } as React.CSSProperties
      }
    >
      <SidebarToggleBridge />

      <Sidebar className="border-none [view-transition-name:tutorials-sidebar]">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = item.id === currentId;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        className="rounded-none font-pixelify text-lg"
                        isActive={isActive}
                        render={
                          <a
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                          />
                        }
                      >
                        {item.title}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {children}
    </SidebarProvider>
  );
}
