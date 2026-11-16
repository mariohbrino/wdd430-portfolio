"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  createProject,
  removeProjectById,
  updateProjectById,
} from "@/modals/projects.modal";
import { database } from "@/services/database.service";
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
    yearCompleted: formData.get("yearCompleted")?.toString() ?? "",
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
    await createProject(database, validated.data);
  } catch (error) {
    console.log("Error occurred while creating project", error);
    throw new Error("Failed to create project");
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
    yearCompleted: formData.get("yearCompleted")?.toString() ?? "",
    link: formData.get("link")?.toString() ?? "",
    technologies: formData.get("technologies")?.toString() ?? "",
  };

  const validatedId = await projectIdSchema.safeParseAsync(projectId);
  if (!validatedId.success) {
    return {
      message: "Invalid project ID",
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
    await updateProjectById(database, validatedId.data.id, validated.data);
  } catch (error) {
    console.log("Error occurred while updating project", error);
    throw new Error("Failed to update project");
  }

  revalidatePath("/projects");
  redirect(`/projects/${values.type}`);
}

export async function remove(projectId: number): Promise<void> {
  const validated = await projectIdSchema.safeParseAsync(projectId);
  if (!validated.success) {
    throw new Error("Invalid project ID");
  }

  try {
    await removeProjectById(database, validated.data.id);
  } catch (error) {
    console.log("Error occurred while deleting project", error);
    throw new Error("Failed to delete project");
  }

  revalidatePath("/projects");
  redirect("/projects");
}
