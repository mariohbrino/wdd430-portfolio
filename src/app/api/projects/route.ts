import { type NextRequest, NextResponse } from "next/server";

import { getProjects } from "@/modals/projects.modal";
import { database } from "@/services/database.service";
import { projectQuerySchema } from "@/validations/project.validate";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const validated = projectQuerySchema.safeParse(
    Object.fromEntries(searchParams),
  );

  if (!validated.success) {
    return NextResponse.json(
      { error: "Invalid request parameters", errors: validated.error.issues },
      { status: 400 },
    );
  }

  const { type, page, query, limit } = validated.data;
  const projects = await getProjects(database, type, page, query, limit);

  return NextResponse.json(projects);
}
