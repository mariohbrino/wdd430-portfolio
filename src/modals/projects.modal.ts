import {
  and,
  arrayOverlaps,
  eq,
  getTableColumns,
  ilike,
  or,
  sql,
} from "drizzle-orm";

import * as tables from "@/database/schema";
import type { Database } from "@/types/database.type";
import type {
  Project,
  ProjectResponse,
  ProjectType,
} from "@/types/project.type";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const getProjects = async (
  db: Database,
  type?: ProjectType,
  page = DEFAULT_PAGE,
  query?: string,
  limit = DEFAULT_PAGE_SIZE,
): Promise<ProjectResponse> => {
  const offset = (page - 1) * limit;

  const conditions = [];

  if (query) {
    conditions.push(
      or(
        ilike(tables.projects.title, `%${query}%`),
        ilike(tables.projects.description, `%${query}%`),
        ilike(tables.projects.yearCompleted, `%${query}%`),
        arrayOverlaps(tables.projects.technologies, [query]),
      ),
    );
  }

  if (type) {
    conditions.push(eq(tables.projects.type, type));
  }

  try {
    const rows = await db()
      .select({
        ...getTableColumns(tables.projects),
        total: sql<number>`count(*) over()`.mapWith(Number),
      })
      .from(tables.projects)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .limit(limit)
      .offset(offset);

    const total = rows[0]?.total ?? 0;

    const data = rows.map(({ total, ...project }) => {
      void total;
      return project;
    });

    return {
      data,
      total,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < Math.ceil(total / limit) ? page + 1 : null,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.log("Error occurred while fetching projects", error);
    throw new Error("Failed to fetch projects");
  }
};

export const getProjectById = async (
  db: Database,
  id: number,
): Promise<Project | undefined> => {
  try {
    const result = await db()
      .select({
        ...getTableColumns(tables.projects),
      })
      .from(tables.projects)
      .where(eq(tables.projects.id, id));
    return result[0] ? result[0] : undefined;
  } catch (error) {
    console.log("Error occurred while fetching project by ID", error);
    throw new Error("Failed to fetch project by ID");
  }
};

export const createProject = async (
  db: Database,
  project: Omit<Project, "id" | "createdAt" | "updatedAt">,
): Promise<Project> => {
  try {
    const result = await db()
      .insert(tables.projects)
      .values(project)
      .returning({
        ...getTableColumns(tables.projects),
      });
    return result[0];
  } catch (error) {
    console.log("Error occurred while creating project", error);
    throw new Error("Failed to create project");
  }
};

export const updateProjectById = async (
  db: Database,
  id: number,
  project: Omit<Project, "id" | "createdAt" | "updatedAt">,
): Promise<Project | undefined> => {
  try {
    const result = await db()
      .update(tables.projects)
      .set({
        ...project,
        updatedAt: new Date(),
      })
      .where(eq(tables.projects.id, id))
      .returning({
        ...getTableColumns(tables.projects),
      });
    return result[0] ? result[0] : undefined;
  } catch (error) {
    console.log("Error occurred while updating project", error);
    throw new Error("Failed to update project");
  }
};

export const removeProjectById = async (
  db: Database,
  id: number,
): Promise<boolean> => {
  try {
    const result = await db()
      .delete(tables.projects)
      .where(eq(tables.projects.id, id));
    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.log("Error occurred while deleting project", error);
    throw new Error("Failed to delete project");
  }
};
