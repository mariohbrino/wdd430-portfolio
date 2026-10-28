import PersonalIntroduction from "@/components/personal-introduction";

const aboutContent = {
  title: "About Me",
  content:
    "I'm a software engineer specializing in building web applications using modern technologies.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl grow p-6">
      <PersonalIntroduction {...aboutContent} />
    </main>
  );
}
