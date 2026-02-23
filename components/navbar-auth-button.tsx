import Image from "next/image";

import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export async function NavbarAuthButton() {
  const session = await auth();

  if (!session?.user) {
    return (
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
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
