"use client";

import { useActionState, useState } from "react";

import { remove } from "@/actions/project.action";
import type { RemoveState } from "@/types/project.type";

const initialState: RemoveState = {};

const removeAction = async (id: number) => {
  try {
    await remove(id);
    return initialState;
  } catch {
    return { error: "Failed to remove the project. Please try again." };
  }
};

export const ProjectRemoveButton = ({ id }: { id: number }) => {
  const [state, formAction, pending] = useActionState<RemoveState>(
    () => removeAction(id),
    initialState,
  );

  const [dismissed, setDismissed] = useState(false);

  const showError = Boolean(state?.error) && !dismissed;

  return (
    <form
      action={formAction}
      onSubmit={() => setDismissed(false)}
      className="relative flex flex-col items-end gap-2"
    >
      <button
        aria-label="Remove project"
        type="submit"
        className="flex cursor-pointer flex-row items-center gap-2 rounded-r-2xl bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-700/80 disabled:cursor-not-allowed disabled:bg-red-700/50"
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
      {state?.error && !pending && showError && (
        <div
          role="alert"
          className="bg-background absolute right-0 bottom-full z-50 mb-2 flex w-max max-w-72 items-start gap-3 rounded-md px-3 py-2 text-sm text-white shadow-lg"
        >
          <p className="flex-1">{state.error}</p>

          <button
            type="button"
            aria-label="Dismiss error"
            onClick={() => setDismissed(true)}
            className="shrink-0 rounded-sm opacity-80 hover:opacity-100"
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
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
      )}
    </form>
  );
};
