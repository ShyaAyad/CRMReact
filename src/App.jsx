import ProjectCard from "./pages/ProjectCard.jsx";
import Navbar from "./components/Navbar.jsx";
import ClientCard from "./pages/ClientCard.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import ClientDetails from "./pages/ClientDetails.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/projects" element={<ProjectCard />} />
        <Route path="/clients" element={<ClientCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/client/:id" element={<ClientDetails />} />
      </Routes>
    </>
  )
}

export default App
