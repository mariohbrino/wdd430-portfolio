export async function GET() {
  return Response.json(
    { message: "Hello from Next.js API!" },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}
