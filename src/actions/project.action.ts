"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  createProject,
  deleteProjectById,
  updateProjectById,
} from "@/modals/projects.modal";
import type { ProjectState } from "@/types/project.type";
import { projectIdSchema } from "@/validations/project-id.validate";
import { projectSchema } from "@/validations/project.validate";

export async function create(
  _prevState: ProjectState,
  formData: FormData,
): Promise<ProjectState> {
  const values = {
    type: formData.get("type")?.toString() ?? "",
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    link: formData.get("link")?.toString() ?? "",
    technologies: formData.get("technologies")?.toString() ?? "",
  };

  const validated = await projectSchema.safeParseAsync(values);

  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      message: "Please fix the errors below and try again.",
      values,
    };
  }

  try {
    await createProject(validated.data);
  } catch {
    return {
      message:
        "Something went wrong while saving the project. Please try again.",
      values,
    };
  }

  revalidatePath("/projects");
  redirect(`/projects/${validated.data.type}`);
}

export async function update(
  _prevState: ProjectState,
  projectId: number,
  formData: FormData,
): Promise<ProjectState> {
  const values = {
    type: formData.get("type")?.toString() ?? "",
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    link: formData.get("link")?.toString() ?? "",
    technologies: formData.get("technologies")?.toString() ?? "",
  };

  const validatedId = await projectIdSchema.safeParseAsync(projectId);
  if (!validatedId.success) {
    return {
      message: "Invalid project ID or project not found",
      values,
    };
  }

  const validated = await projectSchema.safeParseAsync(values);
  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      message: "Please fix the errors below and try again.",
      values,
    };
  }

  try {
    await updateProjectById(validatedId.data.id, validated.data);
  } catch {
    return {
      message:
        "Something went wrong while updating the project. Please try again.",
      values,
    };
  }

  revalidatePath("/projects");
  redirect(`/projects/${values.type}`);
}

export async function remove(projectId: number): Promise<void> {
  const validated = await projectIdSchema.safeParseAsync(projectId);
  if (!validated.success) {
    throw new Error("Invalid project ID");
  }

  const project = validated.data;
  await deleteProjectById(project.id);

  revalidatePath("/projects");
  redirect("/projects");
}
