import ProjectCard from "./pages/ProjectCard.jsx";
import ClientCard from "./pages/ClientCard.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import ClientDetails from "./pages/ClientDetails.jsx";
import AddNew from "./pages/AddNew.jsx";
import AddProject from "./pages/AddProject.jsx";
import AddClient from "./pages/AddClient.jsx";
import Home from "./pages/Home.jsx";
import EditProject from "./pages/EditProject.jsx";
import Register from "./components/Register.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import Layout from "./components/Layout.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import RecycleBin from "./pages/RecycleBin.jsx";

function App() {
  return (
    <AuthContextProvider>
      {/* wrap component with the provider to get access to the context in any component that needs it */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />

          <Route path="/projects" element={<ProjectCard />} />
          <Route path="/edit-project/:id" element={<EditProject />} />
          <Route path="/clients" element={<ClientCard />} />
          <Route path="/clients/:id" element={<ClientDetails />} /> {/* only navigate to that specific client details */}
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/add" element={<AddNew />} />
          <Route path="/addProject" element={<AddProject />} />
          <Route path="/recycle-bin" element={<RecycleBin />} />
          <Route path="/addClient" element={<AddClient />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
