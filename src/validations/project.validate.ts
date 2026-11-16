import { z } from "zod";

import type { ProjectType } from "@/types/project.type";

export const PROJECT_LIMITS: number[] = [5, 10, 15];
export const DEFAULT_PROJECT_LIMIT = 5;

const projectTypes: ProjectType[] = ["opensource", "school"];

export const projectQuerySchema = z.object({
  type: z.enum(projectTypes).optional(),
  page: z.coerce
    .number({ error: "Project pagination page must be a valid number" })
    .int({ message: "Page must be an integer" })
    .min(1, { message: "Project pagination minimum is 1" })
    .default(1),
  query: z.string({ error: "Invalid term search page parameter" }).default(""),
  limit: z.coerce
    .number({ error: "Invalid limit parameter" })
    .refine((value) => PROJECT_LIMITS.some((limit) => limit === value), {
      message: `Limit must be one of the following values: ${PROJECT_LIMITS.join(", ")}`,
    })
    .default(DEFAULT_PROJECT_LIMIT),
});

export const projectSchema = z.object({
  type: z.enum(projectTypes, { error: "Please select a project type" }),
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be at most 255 characters" }),
  description: z.string().min(1, { message: "Description is required" }),
  yearCompleted: z.coerce
    .number({ error: "Year completed must be a valid number" })
    .int({ message: "Year completed must be an integer" })
    .min(2010, { message: "Year completed must be at least 2010" }),
  link: z
    .string()
    .min(1, { message: "Link is required" })
    .max(500, { message: "Link must be at most 500 characters" }),
  technologies: z
    .string({ error: "Technologies must be a string" })
    .transform((value) =>
      value
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0),
    )
    .refine((arr) => arr.length > 0, {
      message: "At least one technology is required",
    }),
});
