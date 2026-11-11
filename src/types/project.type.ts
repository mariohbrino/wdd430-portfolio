import { projects } from "@/database/schemas/projects.schema";

export type ProjectType = "opensource" | "school";

export type Project = typeof projects.$inferSelect;

export type ProjectResponse = {
  data: Project[];
  total: number;
  totalPages: number;
};
