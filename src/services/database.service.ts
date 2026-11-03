import { projects } from "@/data/projects.data";
import { Project } from "@/types/project.type";

export const getProjects = async (type?: string): Promise<Project[]> => {
  if (type) {
    return projects.filter((project) => project.type === type);
  }
  return projects;
};

export const getProjectById = async (
  id: number,
): Promise<Project | undefined> => {
  return projects.find((project) => project.id === id);
};
