import { projects } from "@/database/schemas/projects.schema";

export type ProjectType = "opensource" | "school";

export type Project = typeof projects.$inferSelect;
