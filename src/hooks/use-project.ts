import { api } from "@/trpc/react";
import { useLocalStorage } from "usehooks-ts";

const useProject = () => {
  const { data: projects } = api.project.getProjects.useQuery();

  // Using local storage to persist the selected project id even after page reload
  const [selectedProjectId, setSelectedProjectId] = useLocalStorage(
    "selectedProjectId",
    "",
  );
  const project = projects?.find((project) => project.id === selectedProjectId);
  
  // Returning the projects, project, selectedProjectId, and setSelectedProjectId || so it can be used in other components(sidebar).
  return {
    projects,
    project,
    selectedProjectId,
    setSelectedProjectId,
  };
};

export default useProject;
