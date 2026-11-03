import { type NextRequest, NextResponse } from "next/server";

import { getProjects } from "@/services/database.service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || undefined;

  const projects = await getProjects(type);

  return NextResponse.json(projects);
}
