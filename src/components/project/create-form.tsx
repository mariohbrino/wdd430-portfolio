"use client";

import Select from "@/components/ui/select";
import { useActionState } from "react";

import { create } from "@/actions/project.action";
import Field from "@/components/ui/field";
import type { ProjectState } from "@/types/project.type";

const initialState: ProjectState = {};

export default function ProjectCreateForm() {
  const [state, formAction, pending] = useActionState(create, initialState);

  return (
    <form
      action={formAction}
      noValidate
      className="border-border bg-card text-card-foreground flex w-full max-w-3xl flex-col gap-5 rounded-lg border p-6 shadow-sm"
    >
      <Select
        title="Project Type"
        defaultValue={"opensource"}
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
        className="bg-primary text-primary-foreground flex items-center gap-2 self-start rounded-md px-5 py-2 font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span aria-label="submit-label">Create Project</span>
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
