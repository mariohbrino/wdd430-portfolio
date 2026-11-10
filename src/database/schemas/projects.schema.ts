import { ProjectType } from "@/types/project.type";
import { sql } from "drizzle-orm";
import {
  check,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const projects = pgTable(
  "projects",
  {
    id: serial("id").primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    description: text("description").notNull().default(""),
    type: varchar({ length: 20 }).$type<ProjectType>().notNull(),
    technologies: text().array().notNull().default([]),
    link: varchar({ length: 500 }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => [
    check(
      "projects_type_check",
      sql`${table.type} in ('opensource', 'school')`,
    ),
  ],
);
