import ProjectCard from "./pages/ProjectCard.jsx";
import Navbar from "./components/Navbar.jsx";
import ClientCard from "./pages/ClientCard.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/projects" element={<ProjectCard />} />
        <Route path="/clients" element={<ClientCard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
