import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getAllProjects } from "@/modals/projects.modal";
import type { ProjectType } from "@/types/project.type";

const projectTypes = ["opensource", "school"] as const;
const projectTypeSchema = z.enum(projectTypes);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as ProjectType;

  const typeValidation = projectTypeSchema.safeParse(type);

  if (type && !typeValidation.success) {
    return NextResponse.json(
      { error: "Invalid project type" },
      { status: 400 },
    );
  }

  const projects = await getAllProjects(type);

  return NextResponse.json(projects);
}
