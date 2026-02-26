export const isAdmin = (scopes: string[]): boolean =>
  scopes.some((s) => s.startsWith("admin:"));

export const isVenueOwner = (scopes: string[]): boolean =>
  scopes.includes("venues:me") && !isAdmin(scopes);
