import Home from "@/pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Tutorials from "./pages/Tutorials/Tutorials";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={Layout}>
            <Route path="/" Component={Home} />
            <Route path="/tutorials/:filename" Component={Tutorials} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
