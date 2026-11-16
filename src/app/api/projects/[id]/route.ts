import { type NextRequest, NextResponse } from "next/server";

import { projectIdSchema } from "@/validations/project-id.validate";

type ProjectProps = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: ProjectProps) {
  void request;

  try {
    const { id } = await params;
    const validated = await projectIdSchema.safeParseAsync(id);

    if (!validated.success) {
      const notFound = validated.error.issues.some(
        (issue) => issue.code === "custom" && issue.params?.notFound === true,
      );

      return NextResponse.json(
        { error: notFound ? "Project not found" : "Invalid project ID" },
        { status: notFound ? 404 : 400 },
      );
    }

    const project = validated.data;

    return NextResponse.json(project);
  } catch (error) {
    console.log("Error occurred while fetching project by ID", error);
    return NextResponse.json(
      { error: "Failed to fetch project by ID" },
      { status: 500 },
    );
  }
}
