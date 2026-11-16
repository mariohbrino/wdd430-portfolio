"use client";

import { useActionState } from "react";

import { remove } from "@/actions/project.action";
import type { RemoveState } from "@/types/project.type";

const initialState: RemoveState = {};

export const ProjectRemoveButton = ({ id }: { id: number }) => {
  const [state, formAction, pending] = useActionState<RemoveState>(async () => {
    try {
      await remove(id);
      return initialState;
    } catch {
      return { error: "Failed to remove the project. Please try again." };
    }
  }, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col items-end gap-2"
    >
      <button
        aria-label="Remove project"
        type="submit"
        className="cursor-pointer rounded-r-2xl bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-700/80 disabled:cursor-not-allowed disabled:bg-red-700/50"
        disabled={pending}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-trash preview-icon"
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </button>
      {state?.error && !pending && (
        <p className="text-destructive text-sm">{state.error}</p>
      )}
    </form>
  );
};
