import { auth } from "@/auth";

const GITHUB_REPOS_ENDPOINT = "https://api.github.com/user/repos";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!session.accessToken) {
    return Response.json(
      { error: "GitHub access token missing in session" },
      { status: 403 },
    );
  }

  const response = await fetch(
    `${GITHUB_REPOS_ENDPOINT}?per_page=100&sort=updated&affiliation=owner,collaborator,organization_member`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    return Response.json(
      {
        error: "GitHub API request failed",
        details: errorText,
      },
      { status: response.status },
    );
  }

  const repos = (await response.json()) as Array<{
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    default_branch: string;
    updated_at: string;
  }>;

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
}
