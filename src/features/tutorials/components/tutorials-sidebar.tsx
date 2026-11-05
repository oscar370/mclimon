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
import { onSidebarToggleRequest } from "@/stores/sidebar";
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

export async function TutorialsSidebar({
  items,
  currentId,
  children,
}: TutorialsSidebarProps) {
  return (
    <SidebarProvider
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
                {items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      className="rounded-none font-pixelify text-lg"
                      render={
                        <a
                          href={item.href}
                          aria-current={
                            item.id === currentId ? "page" : undefined
                          }
                        />
                      }
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {children}
    </SidebarProvider>
  );
}
