import Sidebar from "@/components/Sidebar";
import MarkdownViewer from "@/pages/Tutorials/components/MarkdownViewer";
import { useState } from "react";
import SidebarButtons from "./components/SidebarButtons";

export default function Tutorials() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev);
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}>
        <div className="absolute top-5 left-3">
          <Sidebar.ToggleButton />
        </div>

        <div className="grid sm:grid-cols-[minmax(min-content,200px)_1fr]">
          <Sidebar.Panel>
            <SidebarButtons toggleSidebar={toggleSidebar} />
          </Sidebar.Panel>

          <main className="mx-auto max-w-150 space-y-2 px-2 py-12">
            <MarkdownViewer />
          </main>
        </div>
      </Sidebar>
    </>
  );
}
