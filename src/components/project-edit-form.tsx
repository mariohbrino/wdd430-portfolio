"use client";

import Select from "@/components/ui/select";
import { useActionState, useEffect, useRef } from "react";

import { update } from "@/actions/project.action";
import Field from "@/components/ui/field";
import type { Project, ProjectState } from "@/types/project.type";

const initialState: ProjectState = {};

export default function ProjectEditForm({ project }: { project: Project }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(
    (state: ProjectState, formData: FormData) =>
      update(state, project.id, formData),
    initialState,
  );

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    for (const field of [
      "title",
      "description",
      "link",
      "technologies",
    ] as const) {
      const input = form.elements.namedItem(field);
      const raw = project[field];
      const value = Array.isArray(raw) ? raw.join(", ") : raw;
      if (
        (input instanceof HTMLInputElement ||
          input instanceof HTMLTextAreaElement) &&
        typeof value === "string"
      ) {
        input.defaultValue = value;
        input.value = value;
      }
    }
  }, [project]);

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="border-border bg-card text-card-foreground flex w-full max-w-3xl flex-col gap-5 rounded-lg border p-6 shadow-sm"
    >
      <Select
        title="Project Type"
        defaultValue={project.type}
        state={state}
        placeholder="Select a project type"
        field="type"
      />
      <Field
        state={state}
        placeholder="Enter the project title"
        field="title"
      />
      <Field
        state={state}
        placeholder="Enter the project description"
        field="description"
      />
      <Field
        state={state}
        placeholder="Enter the project link"
        field="link"
        type="url"
      />
      <Field
        state={state}
        placeholder="Enter the technologies used"
        field="technologies"
      />

      <button
        type="submit"
        disabled={pending}
        className="bg-primary text-primary-foreground self-start rounded-md px-5 py-2 font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving..." : "Update Project"}
      </button>

      {state.message && (
        <p
          aria-live="polite"
          className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
