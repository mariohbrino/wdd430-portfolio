import { z } from "zod";

import type { ProjectType } from "@/types/project.type";

const projectTypes: ProjectType[] = ["opensource", "school"];
const projectLimits: number[] = [5, 10, 15];

export const projectSchema = z.object({
  type: z.enum(projectTypes).optional(),
  page: z.coerce
    .number({ error: "Project pagination page must be a valid number" })
    .int({ message: "Page must be an integer" })
    .min(1, { message: "Project pagination minimum is 1" })
    .default(1),
  query: z.string({ error: "Invalid term search page parameter" }).default(""),
  limit: z.coerce
    .number({ error: "Invalid limit parameter" })
    .refine((value) => projectLimits.some((limit) => limit === value), {
      message: `Limit must be one of the following values: ${projectLimits.join(", ")}`,
    })
    .default(10),
});
