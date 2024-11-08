import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useUserContext } from "@/context/userContext";

export default function Layout() {
  const { user } = useUserContext();
  const handleLogoutClick = () => {
    // Handle logout logic here
    setUser(null);
    supabase.auth.signOut();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {!user && <NavLink to="/login">Login</NavLink>}
      {user && <button onClick={handleLogoutClick}>Logout</button>}
      <Outlet />
      <Footer />
    </div>
  );
}
