import { z } from "zod";

import { getProjectById } from "@/modals/projects.modal";
import { database } from "@/services/database.service";

export const projectIdSchema = z.coerce
  .number({ error: "Project ID must be a valid number" })
  .int({ message: "Project ID must be an integer" })
  .refine((value) => value > 0, {
    message: "Project ID must be a positive integer",
  })
  .transform(async (id, ctx) => {
    const record = await getProjectById(database, id);
    if (!record) {
      ctx.addIssue({
        code: "custom",
        message: "Project not found",
      });
      return z.NEVER;
    }
    return record;
  });
