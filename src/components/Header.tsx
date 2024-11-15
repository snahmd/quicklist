import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { useUserContext } from "@/context/userContext";

export default function Header() {
  const { user } = useUserContext();
  return (
    <>
      {!user && <TopBar />}
      <NavBar />
    </>
  );
}
