import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/userContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useUserContext();
  const location = useLocation();

  if (loading) {
    // Kullanıcı bilgileri yüklenirken, yükleme ekranını göster
    return <div>Loading...</div>;
  }

  if (!user) {
    // Kullanıcı oturum açmamışsa, giriş sayfasına yönlendir ve mevcut konumu sakla
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
