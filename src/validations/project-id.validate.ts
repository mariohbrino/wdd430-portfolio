import { z } from "zod";

import { getProjectById } from "@/modals/projects.modal";

// Server-only schema: performs a database lookup, so it must not be
// imported from client components.
// Parses a raw project id and resolves it to the existing project record.
export const projectIdSchema = z.coerce
  .number({ error: "Project ID must be a valid number" })
  .int({ message: "Project ID must be an integer" })
  .refine((value) => value > 0, {
    message: "Project ID must be a positive integer",
  })
  .transform(async (id, ctx) => {
    const record = await getProjectById(id);
    if (!record) {
      ctx.addIssue({
        code: "custom",
        message: "Project not found",
      });
      return z.NEVER;
    }
    return record;
  });
