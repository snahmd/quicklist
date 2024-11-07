import { NavLink } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ShoppingCart } from "lucide-react";
import logo from "../assets/quicklist-logo.png";

export default function NavBar() {
  return (
    <header className="bg-[#4CAF50] text-white p-4">
      <div className="container mx-auto flex items-center justify-around gap-4">
        <NavLink to="/" className="text-2xl font-bold">
          <img src={logo} alt="" />
        </NavLink>
        <div className="flex-1 max-w-2xl">
          <div className="relative flex items-center">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-white/10 border-r-0 rounded-r-none text-white bg-[#2e7d32]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="home">Home & Garden</SelectItem>
              </SelectContent>
            </Select>
            <Input
              className="flex-1 pl-3 bg-white/10 border-white/20 text-white placeholder:text-white/70 rounded-l-none"
              placeholder="Search products..."
            />
            <Button
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              variant="ghost"
            >
              <Search className="h-4 w-4 text-white/70" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white p-2">
            <ShoppingCart className="h-6 w-6" />
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
