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
import { database } from "@/services/database.service";
import type {
  Project,
  ProjectResponse,
  ProjectType,
} from "@/types/project.type";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export const getAllProjects = async (
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
        arrayOverlaps(tables.projects.technologies, [query]),
      ),
    );
  }

  if (type) {
    conditions.push(eq(tables.projects.type, type));
  }

  const rows = await database()
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
