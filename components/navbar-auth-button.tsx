import Image from "next/image";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { getAuthConfigState } from "@/lib/auth-config";

export async function NavbarAuthButton() {
  const { githubConfigured, secretConfigured } = getAuthConfigState();

  let session = null;

  try {
    session = await auth();
  } catch {
    session = null;
  }

  if (!session?.user) {
    if (!githubConfigured || !secretConfigured) {
      return (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            disabled
            title="Setze GITHUB_ID, GITHUB_SECRET und AUTH_SECRET (oder NEXTAUTH_SECRET) in .env.local und verwende keine Placeholder-Werte."
          >
            Connect GitHub
          </Button>
          <span className="text-xs text-muted-foreground">OAuth/Secret ungültig</span>
        </div>
      );
    }

    return (
      <form action="/api/auth/signin/github" method="get">
        <Button type="submit" size="sm">
          Connect GitHub
        </Button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {session.user.image ? (
        <Image
          src={session.user.image}
          alt={session.user.name ?? "GitHub Avatar"}
          width={28}
          height={28}
          className="rounded-full"
        />
      ) : null}
      <span className="max-w-32 truncate text-sm text-muted-foreground">
        {session.user.name ?? session.user.email ?? "GitHub User"}
      </span>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" variant="outline" size="sm">
          Sign out
        </Button>
      </form>
    </div>
  );
}
