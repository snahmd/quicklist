import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { supabase } from "@/utils/supabaseClient";
import { useUserContext } from "@/context/userContext";

export default function Header() {
  const { user, setUser } = useUserContext();
  const handleLogoutClick = () => {
    // Handle logout logic here
    setUser(null);
    supabase.auth.signOut();
  };
  return (
    <>
      {!user && <TopBar />}
      <NavBar />
    </>
  );
}
