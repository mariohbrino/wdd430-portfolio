export const FieldErrors = ({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) => {
  if (!errors?.length) return null;

  return (
    <ul
      id={id}
      className="flex flex-col gap-1 text-sm text-red-600 dark:text-red-400"
    >
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
};
