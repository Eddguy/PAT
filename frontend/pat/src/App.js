import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Workspace from "./Workspace/Workspace";
import Home from "./Home";
import { useEffect } from "react";
import EditorSandbox from "./Workspace/EditorSandbox";
import Pat from "./Workspace/Pat";
import Navbar from "./Workspace/Navbar";

function App() {
  return (
    <Router>
      <BackgroundWrapper>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="/" element={<Workspace />} />
          <Route path="/editor" element={<EditorSandbox />} />
          <Route path="/nav" element={<Navbar />} />
        </Routes>
      </BackgroundWrapper>
    </Router>
  );
}

function BackgroundWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.body.style.backgroundColor = "#2D3250"; 
    } else {
      document.body.style.backgroundColor = "#ffffff";
    }
  }, [location.pathname]);

  return <>{children}</>;
}

export default App;
