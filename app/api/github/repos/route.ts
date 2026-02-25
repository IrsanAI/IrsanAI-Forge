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

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!session.accessToken) {
    return Response.json({ error: "GitHub access token missing in session" }, { status: 403 });
  }

  try {
    const dynamicImport = new Function("moduleName", "return import(moduleName)") as (
      moduleName: string,
    ) => Promise<unknown>;

    const octokitModule = (await dynamicImport("@octokit/core").catch(() => null)) as
      | {
          Octokit: new (options: { auth: string }) => {
            request: (route: string, params: Record<string, unknown>) => Promise<{ data: GitHubRepo[] }>;
          };
        }
      | null;

    let repos: GitHubRepo[] = [];

    if (octokitModule?.Octokit) {
      const octokit = new octokitModule.Octokit({ auth: session.accessToken });
      const response = await octokit.request("GET /user/repos", {
        per_page: 100,
        sort: "updated",
        affiliation: "owner,collaborator,organization_member",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      repos = response.data;
    } else {
      const fallbackResponse = await fetch(
        "https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator,organization_member",
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
          cache: "no-store",
        },
      );

      if (!fallbackResponse.ok) {
        const errorText = await fallbackResponse.text();
        return Response.json(
          {
            error: "GitHub API request failed",
            details: errorText,
          },
          { status: fallbackResponse.status },
        );
      }

      repos = (await fallbackResponse.json()) as GitHubRepo[];
    }

    return Response.json({
      repos: repos.map((repo) => ({
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
      },
      { status: 500 },
    );
  }
}
