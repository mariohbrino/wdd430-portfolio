import { projects } from "@/database/schemas/projects.schema";

export type ProjectType = "opensource" | "school";

export type Project = typeof projects.$inferSelect;

export type ProjectResponse = {
  data: Project[];
  previousPage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
};
