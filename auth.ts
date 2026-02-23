type AuthHandlers = {
  GET: (request: Request) => Promise<Response>;
  POST: (request: Request) => Promise<Response>;
};

type NextAuthRuntime = {
  handlers: AuthHandlers;
  signIn: (provider?: string) => Promise<void>;
  signOut: () => Promise<void>;
  auth: () => Promise<{
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  } | null>;
};

const dynamicImport = new Function("moduleName", "return import(moduleName)") as (
  moduleName: string,
) => Promise<unknown>;

let nextAuthRuntimePromise: Promise<NextAuthRuntime | null> | null = null;

async function loadNextAuthRuntime(): Promise<NextAuthRuntime | null> {
  if (!nextAuthRuntimePromise) {
    nextAuthRuntimePromise = (async () => {
      try {
        const nextAuthModule = (await dynamicImport("next-auth")) as {
          default: (config: unknown) => NextAuthRuntime;
        };

        const githubProviderModule = (await dynamicImport(
          "next-auth/providers/github"
        )) as {
          default: (config: { clientId?: string; clientSecret?: string }) => unknown;
        };

        return nextAuthModule.default({
          providers: [
            githubProviderModule.default({
              clientId: process.env.GITHUB_ID,
              clientSecret: process.env.GITHUB_SECRET,
            }),
          ],
          pages: {
            signIn: "/",
          },
        });
      } catch {
        return null;
      }
    })();
  }

  return nextAuthRuntimePromise;
}

export async function auth() {
  const runtime = await loadNextAuthRuntime();
  return runtime?.auth() ?? null;
}

export async function signIn(provider = "github") {
  const runtime = await loadNextAuthRuntime();

  if (!runtime) {
    return;
  }

  await runtime.signIn(provider);
}

export async function signOut() {
  const runtime = await loadNextAuthRuntime();

  if (!runtime) {
    return;
  }

  await runtime.signOut();
}

export async function getAuthHandlers() {
  const runtime = await loadNextAuthRuntime();
  return runtime?.handlers ?? null;
}
