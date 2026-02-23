import { getAuthHandlers } from "@/auth";

export async function GET(request: Request) {
  const handlers = await getAuthHandlers();

  if (!handlers) {
    return Response.json(
      { error: "Auth provider is unavailable in this environment." },
      { status: 503 },
    );
  }

  return handlers.GET(request);
}

export async function POST(request: Request) {
  const handlers = await getAuthHandlers();

  if (!handlers) {
    return Response.json(
      { error: "Auth provider is unavailable in this environment." },
      { status: 503 },
    );
  }

  return handlers.POST(request);
}
