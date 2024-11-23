import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  ChevronDown,
  X,
  Filter as FilterIcon,
  Sliders,
  Search,
  User,
  CopyPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "../assets/quicklist-logo.png";

import { supabase } from "@/utils/supabaseClient";
import { useUserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
import { Tables } from "@/types/supabase";
import FilterSection from "./FilterSection";
import FilterCategorySection from "./FilterCategorySection";
import FilterPriceSection from "./FilterPriceSection";

// interface Category {
//   id: string;
//   name: string;
//   image: string;
//   backgroundColor: string;
//   subcategories?: SubCategory[];
// }

interface SubCategory {
  id: string;
  name: string;
}

// const categories: Category[] = [
//   {
//     id: "sale",
//     name: "Sale",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-red-50",
//   },
//   {
//     id: "gifts",
//     name: "Gifts",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-green-50",
//   },
//   {
//     id: "electronics",
//     name: "Electronics",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-purple-50",
//   },
//   {
//     id: "clothing",
//     name: "Clothing & Accessories",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-orange-50",
//     subcategories: [
//       { id: "mens-clothing", name: "Men's Clothing" },
//       { id: "womens-clothing", name: "Women's Clothing" },
//       { id: "mens-shoes", name: "Men's Shoes" },
//       { id: "womens-shoes", name: "Women's Shoes" },
//       { id: "bags", name: "Bags & Luggage" },
//       { id: "accessories", name: "Accessories" },
//       { id: "jewelry", name: "Jewelry" },
//       { id: "watches", name: "Watches" },
//     ],
//   },
//   {
//     id: "home",
//     name: "Home & Garden",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-emerald-50",
//   },
//   {
//     id: "baby",
//     name: "Baby & Kids",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-blue-50",
//   },
//   {
//     id: "watches",
//     name: "Watches & Jewelry",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-yellow-50",
//   },
//   {
//     id: "beauty",
//     name: "Beauty & Health",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-green-50",
//   },
//   {
//     id: "sports",
//     name: "Sports & Leisure",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-purple-50",
//   },
//   {
//     id: "toys",
//     name: "Toys & Games",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-orange-50",
//   },
//   {
//     id: "media",
//     name: "Movies, Books & Music",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-violet-50",
//   },
//   {
//     id: "vehicles",
//     name: "Vehicles",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-emerald-50",
//   },
//   {
//     id: "realestate",
//     name: "Real Estate",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-blue-50",
//   },
//   {
//     id: "services",
//     name: "Services",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-pink-50",
//   },
//   {
//     id: "others",
//     name: "Others",
//     image: "/placeholder.svg?height=200&width=200",
//     backgroundColor: "bg-yellow-50",
//   },
// ];

const colors: SubCategory[] = [
  { id: "beige", name: "Beige" },
  { id: "blue", name: "Blue" },
  { id: "brown", name: "Brown" },
  { id: "yellow", name: "Yellow" },
  { id: "gold", name: "Gold" },
  { id: "gray", name: "Gray" },
  { id: "green", name: "Green" },
  { id: "purple", name: "Purple" },
  { id: "orange", name: "Orange" },
  { id: "pink", name: "Pink" },
  { id: "red", name: "Red" },
  { id: "black", name: "Black" },
  { id: "silver", name: "Silver" },
  { id: "turquoise", name: "Turquoise" },
  { id: "white", name: "White" },
];

// const sizes: SubCategory[] = [
//   { id: "all", name: "All" },
//   { id: "xs", name: "XS" },
//   { id: "s", name: "S" },
//   { id: "m", name: "M" },
//   { id: "l", name: "L" },
//   { id: "xl", name: "XL" },
//   { id: "xxl", name: "XXL" },
// ];

// const conditions: SubCategory[] = [
//   { id: "all", name: "All" },
//   { id: "new", name: "New" },
//   { id: "like-new", name: "Like New" },
//   { id: "good", name: "Good" },
// ];

// const shippingOptions: SubCategory[] = [
//   { id: "all", name: "All" },
//   { id: "shipping", name: "Shipping Available" },
//   { id: "pickup", name: "Pickup Only" },
// ];

// const productTypes: SubCategory[] = [
//   { id: "all", name: "All" },
//   { id: "dress-shirts", name: "Dress Shirts" },
//   { id: "pants", name: "Pants" },
//   { id: "jackets-coats", name: "Jackets & Coats" },
//   { id: "sweaters", name: "Sweaters" },
//   { id: "shirts", name: "Shirts" },
//   { id: "other-menswear", name: "Other Menswear" },
// ];

// const sortOptions = [
//   { id: "newest", name: "Newest First" },
//   { id: "oldest", name: "Oldest First" },
//   { id: "price-low", name: "Price: Low to High" },
//   { id: "price-high", name: "Price: High to Low" },
// ];

interface SelectedFilter {
  filterType: string;
  value: string;
  id?: string;
  priceRange?: number[];
}

export default function NavBar() {
  // useContext for user
  const { user, setUser } = useUserContext();
  const handleLogoutClick = () => {
    setUser(null);
    supabase.auth.signOut();
  };

  // get avatarUrl for user
  const [avatarUrl, setAvatarUrl] = useState(
    "/placeholder.svg?height=100&width=100"
  );

  useEffect(() => {
    if (user) {
      getAvatar();
    }
  }, [user]);

  const getAvatar = async () => {
    const { data, error } = await supabase.storage
      .from("images")
      .download(`${user?.id}/avatar.png`);

    if (error) {
      console.log("Error downloading avatar: ", error.message);
    } else {
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    }
  };

  interface Categories extends Tables<"categories"> {
    sub_categories: Tables<"sub_categories">[];
  }

  const [categories, setCategories] = useState<Categories[]>([]);

  const getCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*, sub_categories(*)");
    if (error) {
      console.error("Error fetching categories: ", error.message);
    } else {
      console.log("Categories: ", data);
      setCategories(data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  // Tables<"articles">

  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  // serahc params
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    setSearchText(query || "");
  }, [location]);

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);

  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters]);

  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    console.log(priceRange);
  }, [priceRange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let state = {
      query: searchText,
      category_id: "",
      color: "",
      condition: "",
      shipping: "",
      price: "",
      price_type: "",
    };
    let url = `/search/?q=${searchText}`;
    console.log("selectedFilters:", selectedFilters);
    for (const selectedFilter of selectedFilters) {
      console.log("adsadsds1");

      if (selectedFilter.filterType === "color") {
        url += `&color=${selectedFilter.value}`;
        state.color = selectedFilter.value;
      }
      console.log("adsadsds2");
      console.log("priceRange:", priceRange);
      console.log("priceRange[0]:", priceRange[0]);
      console.log("priceRange[1]:", priceRange[1]);
      console.log("priceRange[0] !== 0", priceRange[0] !== 0);

      if (selectedFilter.filterType === "condition") {
        url += `&condition=${selectedFilter.value}`;
        state.condition = selectedFilter.value;
      }
      if (selectedFilter.filterType === "shipping") {
        url += `&shipping=${selectedFilter.value}`;
        state.shipping = selectedFilter.value;
      }
      if (selectedFilter.filterType === "sub_category") {
        console.log("filterda sub category var");
        url += `&sub_category=${selectedFilter.value}`;
        state.category_id = selectedFilter.id || "";
      }

      if (selectedFilter.filterType === "price type") {
        url += `&price-type=${selectedFilter.value}`;
        state.price_type = selectedFilter.value;
      }
    }
    if (priceRange[0] !== 0) {
      console.log("ahmed1");
      url += `&min-price=${priceRange[0]}`;
    }
    if (priceRange[1] !== 1000) {
      console.log("ahmed2");
      url += `&max-price=${priceRange[1]}`;
    }
    console.log("url:::", url);
    navigate(url, {
      state: state,
    });
  };

  const removeFilter = (value: string) => {
    setSelectedFilters((prev) => {
      return prev.filter((filter) => filter.value !== value);
    });
  };

  return (
    <header className="bg-[#4CAF50] text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between md:justify-around gap-1 md:gap-4">
          <Link to="/" className="text-2xl font-bold">
            <img
              src={logo}
              alt="Quicklist"
              width={120}
              height={40}
              className="w-24 md:w-32"
            />
          </Link>
          <div className="flex-1 max-w-2xl">
            <div className="relative flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-10 px-3 text-white hover:bg-white/20"
                  >
                    <FilterIcon className="h-4 w-4 md:mr-2" />
                    <p className="hidden md:block">Filter</p>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Sliders className="h-5 w-5" />
                      Filter
                    </SheetTitle>
                  </SheetHeader>

                  <div className="mt-4 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                    {/* Categories */}
                    <FilterCategorySection
                      title="Categories"
                      categories={categories}
                      setSelectedFilters={setSelectedFilters}
                    />

                    {/* Price */}
                    <FilterPriceSection
                      title="Price"
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      setSelectedFilters={setSelectedFilters}
                    />

                    {/* Price Type */}
                    <FilterSection
                      title="Price Type"
                      option={["Fixed Price", "Negotiable", "Giveaway"]}
                      setSelectedFilters={setSelectedFilters}
                    />

                    {/* Condition */}
                    <FilterSection
                      title="Condition"
                      option={["Like New", "New", "Good"]}
                      setSelectedFilters={setSelectedFilters}
                    />

                    {/* Shipping */}
                    <FilterSection
                      title="Shipping"
                      option={["Shipping Available", "Pickup Only"]}
                      setSelectedFilters={setSelectedFilters}
                    />

                    {/* Color */}
                    <FilterSection
                      title="Color"
                      option={colors.map((color) => color.name)}
                      setSelectedFilters={setSelectedFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <form className="w-full" onSubmit={handleSubmit}>
                <Input
                  className="flex-1 pl-3 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  placeholder="Search products..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <Button
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  variant="ghost"
                >
                  <Search className="h-4 w-4 text-white/70" />
                </Button>
              </form>
            </div>
          </div>
          <div className="flex items-center md:gap-4">
            <Button variant="ghost" className="text-white p-2 hidden md:block">
              <Link to="/add-article">
                <CopyPlus className="h-6 w-6" />
              </Link>
            </Button>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex flex-row items-center gap-1 h-auto py-0 bg-inherit hover:bg-white/10 border-none focus:border-none"
                  >
                    <Avatar>
                      {/* <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User"
                      /> */}
                      <AvatarImage src={avatarUrl} alt="User" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/messages">Messages</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/watchlist">Watchlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="bg-slate-100">
                    <button onClick={handleLogoutClick}>Logout</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex flex-row items-center gap-1 h-auto py-0 bg-inherit hover:bg-white/10 border-none focus:border-none"
                  >
                    <Avatar>
                      <AvatarFallback>
                        <User className="h-5 w-5 text-slate-600" />
                      </AvatarFallback>
                    </Avatar>

                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/register">Register</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/login">Login</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
          </div>
        </div>
      </div>

      {(selectedFilters.length > 0 ||
        priceRange[0] !== 0 ||
        priceRange[1] !== 1000) && (
        <div className="bg-white/10 py-2">
          <div className="container mx-auto px-4 flex flex-wrap gap-2">
            {priceRange[0] !== 0 && (
              <Badge variant="secondary" className="bg-white/20 text-white">
                Min Price: {priceRange[0]}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-2 text-white hover:text-white/70"
                  onClick={() => setPriceRange([0, 1000])}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {priceRange[1] !== 1000 && (
              <Badge variant="secondary" className="bg-white/20 text-white">
                Max Price: {priceRange[1]}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-2 text-white hover:text-white/70"
                  onClick={() => setPriceRange([0, 1000])}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}
            {selectedFilters.map((filter, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-white/20 text-white"
              >
                {filter.value}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-2 text-white hover:text-white/70"
                  onClick={() => removeFilter(filter.value)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
