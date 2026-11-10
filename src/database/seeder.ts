import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";
import { reset } from "drizzle-seed";
import { Pool } from "pg";

import { loadDatabaseConfig } from "@/configs/database.config";
import * as schemas from "@/database/schema";
import type { Project } from "@/types/project.type";

const projects: Omit<Project, "id" | "createdAt" | "updatedAt">[] = [
  {
    title: "Python REST API",
    description: "Python REST API with FastAPI",
    type: "opensource",
    technologies: ["Python", "FastAPI", "PostgreSQL"],
    link: "https://github.com/mariohbrino/python-fastapi",
  },
  {
    title: "Book Inventory",
    description: "A web application to manage book inventory",
    type: "school",
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Swagger UI"],
    link: "https://github.com/mariohbrino/book-inventory",
  },
  {
    title: "WDD330 Pokemon Trade Card Games",
    description: "A web-based implementation of the Pokemon Trade Card Game",
    type: "school",
    technologies: ["JavaScript", "HTML", "CSS", "Rest API"],
    link: "https://github.com/mariohbrino/wdd330",
  },
];

const main = async () => {
  const config = loadDatabaseConfig();

  const pool = new Pool({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database,
    ssl: config.sslMode ? { rejectUnauthorized: false } : undefined,
  });

  const db = drizzle({ client: pool });

  // Reset the database
  await reset(db, schemas);

  // Seed the database
  await db.insert(schemas.projects).values(projects);
};

main()
  .then(() => {
    console.log("Database seeding completed successfully.");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
