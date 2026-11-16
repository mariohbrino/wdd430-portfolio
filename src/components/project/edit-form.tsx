"use client";

import Select from "@/components/ui/select";
import { useActionState, useEffect, useRef } from "react";

import { update } from "@/actions/project.action";
import Field from "@/components/ui/field";
import type { Project, ProjectState } from "@/types/project.type";

const initialState: ProjectState = {};

const convertToString = (raw: unknown) => {
  if (Array.isArray(raw)) {
    return raw.join(", ");
  }
  if (raw == null) {
    return "";
  }
  return String(raw);
};

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
      "yearCompleted",
      "link",
      "technologies",
    ] as const) {
      const input = form.elements.namedItem(field);
      const raw = project[field];
      const value = convertToString(raw);
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
        placeholder="Enter the year the project was completed"
        field="yearCompleted"
        type="number"
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
        className="bg-primary text-primary-foreground flex items-center gap-2 self-start rounded-md px-5 py-2 font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span aria-label="submit-label">Update Project</span>
        {pending && (
          <svg
            aria-label="Loading"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-loader preview-icon animate-spin [animation-duration:2s]"
          >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
          </svg>
        )}
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
