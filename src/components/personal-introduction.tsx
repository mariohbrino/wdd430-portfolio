export default function PersonalIntroduction({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
      <p>{content}</p>
    </section>
  );
}
