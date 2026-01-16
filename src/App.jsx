import ProjectCard from "./pages/ProjectCard.jsx";
import Navbar from "./components/Navbar.jsx";
import ClientCard from "./pages/ClientCard.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import ClientDetails from "./pages/ClientDetails.jsx";
import AddNew from "./pages/AddNew.jsx";
import AddProject from "./pages/AddProject.jsx";
import AddClient from "./pages/AddClient.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectCard />} />
        <Route path="/clients" element={<ClientCard />} />
        <Route path="/add" element={<AddNew />} />
        <Route path="/addProject" element={<AddProject />}/>
        <Route path="/addClient" element={<AddClient />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/clients/:id" element={<ClientDetails />} />  {/* only navigate to that specific client details */}
      </Routes>
    </>
  )
}

export default App
