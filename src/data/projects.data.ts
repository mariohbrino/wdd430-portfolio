import { Project } from "@/types/project.type";

export const projects: Project[] = [
  {
    id: 1,
    title: "Python REST API",
    description: "Python REST API with FastAPI",
    type: "opensource",
    technologies: ["Python", "FastAPI", "PostgreSQL"],
    link: "https://github.com/mariohbrino/python-fastapi",
  },
  {
    id: 2,
    title: "Book Inventory",
    description: "A web application to manage book inventory",
    type: "school",
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Swagger UI"],
    link: "https://github.com/mariohbrino/book-inventory",
  },
  {
    id: 3,
    title: "WDD330 Pokemon Trade Card Games",
    description: "A web-based implementation of the Pokemon Trade Card Game",
    type: "school",
    technologies: ["JavaScript", "HTML", "CSS", "Rest API"],
    link: "https://github.com/mariohbrino/wdd330",
  },
];
