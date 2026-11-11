import { type NextRequest, NextResponse } from "next/server";

import { getAllProjects } from "@/modals/projects.modal";
import { projectSchema } from "@/validations/project.validate";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const validated = projectSchema.safeParse(Object.fromEntries(searchParams));

  if (!validated.success) {
    return NextResponse.json(
      { error: "Invalid request parameters", errors: validated.error.issues },
      { status: 400 },
    );
  }

  const { type, page, query, limit } = validated.data;
  const projects = await getAllProjects(type, page, query, limit);

  return NextResponse.json(projects);
}
