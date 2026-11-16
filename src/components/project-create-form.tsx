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
        className="bg-primary text-primary-foreground self-start rounded-md px-5 py-2 font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving..." : "Create Project"}
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
