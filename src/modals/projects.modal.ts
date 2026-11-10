import * as tables from "@/database/schema";
import { database } from "@/services/database.service";
import type { Project, ProjectType } from "@/types/project.type";
import { eq } from "drizzle-orm";

export const getAllProjects = async (
  type?: ProjectType,
): Promise<Project[]> => {
  const query = database().select().from(tables.projects);

  if (type) {
    query.where(eq(tables.projects.type, type));
  }

  const projects = await query;
  return projects;
};

export const getProjectById = async (
  id: number,
): Promise<Project | undefined> => {
  const result = await database()
    .select()
    .from(tables.projects)
    .where(eq(tables.projects.id, id));
  return result[0] ? result[0] : undefined;
};
