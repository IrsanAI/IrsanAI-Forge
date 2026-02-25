type AuthHandlers = {
  GET: (request: Request) => Promise<Response>;
  POST: (request: Request) => Promise<Response>;
};

type AuthSession = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    login?: string | null;
  };
  accessToken?: string;
};

type NextAuthRuntime = {
  handlers: AuthHandlers;
  signIn: (provider?: string) => Promise<void>;
  signOut: () => Promise<void>;
  auth: () => Promise<AuthSession | null>;
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
          "next-auth/providers/github",
        )) as {
          default: (config: {
            clientId?: string;
            clientSecret?: string;
            authorization?: { params?: Record<string, string> };
          }) => unknown;
        };

        return nextAuthModule.default({
          providers: [
            githubProviderModule.default({
              clientId: process.env.GITHUB_ID,
              clientSecret: process.env.GITHUB_SECRET,
              authorization: {
                params: {
                  scope: "read:user repo",
                },
              },
            }),
          ],
          pages: {
            signIn: "/",
          },
          callbacks: {
            jwt({ token, account, profile }: Record<string, any>) {
              if (account?.provider === "github") {
                token.accessToken = account.access_token;
              }

              if (profile?.login) {
                token.login = profile.login;
              }

              return token;
            },
            session({ session, token }: Record<string, any>) {
              if (token?.accessToken) {
                session.accessToken = token.accessToken;
              }

              if (session?.user && token?.login) {
                session.user.login = token.login;
              }

              return session;
            },
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
