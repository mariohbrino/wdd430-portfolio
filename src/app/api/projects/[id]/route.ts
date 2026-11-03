import { type NextRequest, NextResponse } from "next/server";

import { getProjectById } from "@/services/database.service";

type ProjectProps = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: ProjectProps) {
  void request;
  const id = Number((await params).id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const project = await getProjectById(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
