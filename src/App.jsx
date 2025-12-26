import ProjectCard from "./pages/ProjectCard.jsx";
import Navbar from "./components/Navbar.jsx";
import ClientCard from "./pages/ClientCard.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/projects" element={<ProjectCard />} />
        <Route path="/clients" element={<ClientCard />} />
      </Routes>
    </>
  )
}

export default App
