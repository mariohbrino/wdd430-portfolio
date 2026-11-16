import { FieldErrors } from "@/components/ui/field-errors";
import type { ProjectState } from "@/types/project.type";

const Field = ({
  state,
  placeholder,
  field,
  type,
}: {
  state: ProjectState;
  placeholder?: string;
  field: keyof NonNullable<ProjectState["errors"]>;
  type?: string;
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={field}
        className="text-sm font-medium"
      >
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </label>
      <input
        id={field}
        name={field}
        placeholder={placeholder ?? "My awesome project"}
        type={type ?? "text"}
        defaultValue={state.values?.[field]}
        aria-describedby={`${field}-errors`}
        className="border-border bg-card text-card-foreground focus:ring-primary w-full rounded-md border px-3 py-2 shadow-sm transition focus:ring-2 focus:outline-none"
      />
      <FieldErrors
        id={`${field}-errors`}
        errors={state.errors?.[field]}
      />
    </div>
  );
};

export default Field;
