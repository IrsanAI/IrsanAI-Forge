import { auth } from "@/auth";

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  default_branch: string;
  updated_at: string;
};

type OctokitCtor = new (options: { auth: string }) => {
  request: (route: string, params: Record<string, unknown>) => Promise<{ data: GitHubRepo[] }>;
};

async function loadOctokit() {
  const dynamicImport = new Function("moduleName", "return import(moduleName)") as (
    moduleName: string,
  ) => Promise<unknown>;

  const octokitModule = (await dynamicImport("@octokit/core").catch(() => null)) as
    | {
        Octokit: OctokitCtor;
      }
    | null;

  return octokitModule?.Octokit ?? null;
}

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return Response.json(
      {
        error: "Not authenticated",
        nextAction: "Connect GitHub in the header and retry repo sync.",
      },
      { status: 401 },
    );
  }

  if (!session.accessToken) {
    return Response.json(
      {
        error: "GitHub access token missing in session",
        nextAction: "Sign out, sign in again, and ensure OAuth app + callback URL are configured.",
      },
      { status: 403 },
    );
  }

  try {
    const Octokit = await loadOctokit();

    if (!Octokit) {
      return Response.json(
        {
          error: "@octokit/core is not installed. Run: pnpm add @octokit/core",
          nextAction: "If installation fails with 403, check README -> Known Limitations (proxy/registry guidance).",
        },
        { status: 500 },
      );
    }

    const octokit = new Octokit({ auth: session.accessToken });
    const response = await octokit.request("GET /user/repos", {
      per_page: 100,
      sort: "updated",
      affiliation: "owner,collaborator,organization_member",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    return Response.json({
      repos: response.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        private: repo.private,
        htmlUrl: repo.html_url,
        defaultBranch: repo.default_branch,
        updatedAt: repo.updated_at,
      })),
    });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to load repositories",
        details: error instanceof Error ? error.message : "Unknown error",
        nextAction: "Verify GitHub OAuth scopes (`read:user repo`) and retry after reconnecting GitHub.",
      },
      { status: 500 },
    );
  }
}
