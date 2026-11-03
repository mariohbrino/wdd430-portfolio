import { Project } from "@/types/project.type";

export const projects: Project[] = [
  {
    id: 1,
    title: "My Project",
    description: "This is a description of my project.",
    type: "opensource",
    technologies: ["React", "TypeScript"],
    link: "https://example.com",
  },
  {
    id: 2,
    title: "Another Project",
    description: "This is a description of another project.",
    type: "school",
    technologies: ["React", "TypeScript"],
    link: "https://example.com",
  },
];
