import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* {!user && <NavLink to="/login">Login</NavLink>}
      {user && <button onClick={handleLogoutClick}>Logout</button>} */}
      <Outlet />
      <Footer />
    </div>
  );
}
