import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditProject from "./EditProject";

export default function EditProjectPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const project = location.state?.project; // data passed from ProjectCard

  if (!project) {
    // Optional: fetch project by ID if state is empty (e.g., page reload)
    // const project = await api.getProject(id);
  }

  return (
    <EditProject
      projectId={id}
      initialProject={project} // prefill form
      onClose={() => navigate(-1)} // go back to projects page
    />
  );
}
