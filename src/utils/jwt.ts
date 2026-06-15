export function decodeJwt<T>(token: string): T | null {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded) as T;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string) {
  const payload = decodeJwt<{ exp?: number }>(token);
  if (!payload?.exp) return false;

  return Date.now() >= payload.exp * 1000;
}

export function createDemoToken(seconds = 3600) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + seconds }));
  return `${header}.${payload}.demo-signature`;
}
