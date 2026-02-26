const PLACEHOLDER_PREFIXES = ["replace_with_", "changeme", "your_"];

function isConfigured(value: string | undefined) {
  if (!value) {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  return !PLACEHOLDER_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

export function getAuthConfigState() {
  const githubId = process.env.GITHUB_ID;
  const githubSecret = process.env.GITHUB_SECRET;
  const providedSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  const devFallbackSecret = process.env.NODE_ENV === "production" ? undefined : "dev-insecure-auth-secret";
  const authSecret = isConfigured(providedSecret) ? providedSecret : devFallbackSecret;

  return {
    githubId,
    githubSecret,
    authSecret,
    githubConfigured: isConfigured(githubId) && isConfigured(githubSecret),
    secretConfigured: isConfigured(providedSecret) || Boolean(devFallbackSecret),
  };
}
