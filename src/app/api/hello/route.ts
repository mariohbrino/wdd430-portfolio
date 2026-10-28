export async function GET() {
  return Response.json(
    { message: "Hello, world!" },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
}
