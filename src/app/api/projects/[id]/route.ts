import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getProjectById } from "@/modals/projects.modal";

const projectIdSchema = z.number().int().positive();

type ProjectProps = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: ProjectProps) {
  void request;
  const id = Number((await params).id);

  if (!projectIdSchema.safeParse(id).success) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  const project = await getProjectById(id);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
