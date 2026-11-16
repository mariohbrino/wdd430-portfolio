import { FieldErrors } from "@/components/ui/field-errors";
import type { ProjectState } from "@/types/project.type";

const Select = ({
  state,
  placeholder,
  field,
  title,
  defaultValue,
}: {
  state: ProjectState;
  placeholder?: string;
  field: keyof NonNullable<ProjectState["errors"]>;
  title: string;
  defaultValue?: string;
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={field}
        className="text-sm font-medium"
      >
        {title}
      </label>
      <select
        key={state.values?.[field] ?? "initial"}
        id={field}
        name={field}
        defaultValue={state.values?.[field] ?? defaultValue ?? ""}
        aria-describedby={`${field}-errors`}
        className="border-border bg-card text-card-foreground focus:ring-primary w-full rounded-md border px-3 py-2 shadow-sm transition focus:ring-2 focus:outline-none"
      >
        <option
          value=""
          disabled
        >
          {placeholder ?? "Select a project type"}
        </option>
        <option value="opensource">Open Source</option>
        <option value="school">School</option>
      </select>
      <FieldErrors
        id={`${field}-errors`}
        errors={state.errors?.[field]}
      />
    </div>
  );
};

export default Select;
