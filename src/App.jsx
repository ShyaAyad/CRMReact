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
import EditClient from "./pages/EditClient.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectCard />} />

        <Route path="/clients" element={<ClientCard />} />
        <Route path="/clients/:id" element={<ClientDetails />} />  {/* only navigate to that specific client details */}
        <Route path="/edit-client/:id" element={<EditClient />} />

        <Route path="/add" element={<AddNew />} />
        <Route path="/addProject" element={<AddProject />}/>
        <Route path="/addClient" element={<AddClient />}/>
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
