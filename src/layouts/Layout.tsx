import NavBar from "@/components/NavBar";
import NavigationButtons from "@/layouts/components/NavigationButtons";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const isHome = location.pathname === "/";

  return (
    <>
      <NavBar variant={isHome ? "float" : "block"}>
        <NavigationButtons />
      </NavBar>

      <div>
        <Outlet />
      </div>

      <Toaster />
    </>
  );
}
