import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="bg-[#2e7d32] text-white py-2">
      <div className="container mx-auto flex justify-end items-center gap-4">
        <Button
          variant="ghost"
          className="text-white hover:text-white/80 hover:bg-[#4CAF50]"
        >
          <Link to="/login">Sign In</Link>
        </Button>
        <Button
          variant="outline"
          className="text-[#4CAF50] hover:bg-white/20 hover:border-white mr-2"
        >
          <Link to="/register">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
