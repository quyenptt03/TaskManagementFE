import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useUserStore();
  //@ts-ignore
  const profile: User = user?.user;

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  if (!profile) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
