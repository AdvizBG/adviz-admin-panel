import { Outlet } from "react-router-dom";
import { useMe } from "@/app/auth/api/hooks";

interface ProtectedRouteProps {
  requiredScopes?: string[];
}

export function ProtectedRoute({ requiredScopes = [] }: ProtectedRouteProps) {
  const { data: user, isLoading, isError } = useMe();

  if (isLoading) return <div>Loading...</div>; // or a spinner

  if (isError || !user) {
    const basename = import.meta.env.VITE_BASENAME || "";
    window.location.href =
      "/bg/auth/login?redirect=" + encodeURIComponent(basename + "/");
    return null;
  }

  const hasScopes = requiredScopes.every((scope) =>
    user.scopes.includes(scope),
  );

  if (!hasScopes) {
    return <Outlet />; // let the sidebar handle visibility
  }

  return <Outlet />;
}
