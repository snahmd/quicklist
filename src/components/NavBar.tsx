import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
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
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "../assets/quicklist-logo.png";

import { supabase } from "@/utils/supabaseClient";
import { useUserContext } from "@/context/userContext";

interface Category {
  id: string;
  name: string;
  image: string;
  backgroundColor: string;
  subcategories?: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
}

interface SelectedFilter {
  category: string;
  value: string;
  label: string;
}

const categories: Category[] = [
  {
    id: "sale",
    name: "Sale",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-red-50",
  },
  {
    id: "gifts",
    name: "Gifts",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-green-50",
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-purple-50",
  },
  {
    id: "clothing",
    name: "Clothing & Accessories",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-orange-50",
    subcategories: [
      { id: "mens-clothing", name: "Men's Clothing" },
      { id: "womens-clothing", name: "Women's Clothing" },
      { id: "mens-shoes", name: "Men's Shoes" },
      { id: "womens-shoes", name: "Women's Shoes" },
      { id: "bags", name: "Bags & Luggage" },
      { id: "accessories", name: "Accessories" },
      { id: "jewelry", name: "Jewelry" },
      { id: "watches", name: "Watches" },
    ],
  },
  {
    id: "home",
    name: "Home & Garden",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-emerald-50",
  },
  {
    id: "baby",
    name: "Baby & Kids",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-blue-50",
  },
  {
    id: "watches",
    name: "Watches & Jewelry",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-yellow-50",
  },
  {
    id: "beauty",
    name: "Beauty & Health",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-green-50",
  },
  {
    id: "sports",
    name: "Sports & Leisure",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-purple-50",
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-orange-50",
  },
  {
    id: "media",
    name: "Movies, Books & Music",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-violet-50",
  },
  {
    id: "vehicles",
    name: "Vehicles",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-emerald-50",
  },
  {
    id: "realestate",
    name: "Real Estate",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-blue-50",
  },
  {
    id: "services",
    name: "Services",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-pink-50",
  },
  {
    id: "others",
    name: "Others",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-yellow-50",
  },
];

const colors: SubCategory[] = [
  { id: "all", name: "All" },
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

const sizes: SubCategory[] = [
  { id: "all", name: "All" },
  { id: "xs", name: "XS" },
  { id: "s", name: "S" },
  { id: "m", name: "M" },
  { id: "l", name: "L" },
  { id: "xl", name: "XL" },
  { id: "xxl", name: "XXL" },
];

const conditions: SubCategory[] = [
  { id: "all", name: "All" },
  { id: "new", name: "New" },
  { id: "like-new", name: "Like New" },
  { id: "good", name: "Good" },
];

const shippingOptions: SubCategory[] = [
  { id: "all", name: "All" },
  { id: "shipping", name: "Shipping Available" },
  { id: "pickup", name: "Pickup Only" },
];

const productTypes: SubCategory[] = [
  { id: "all", name: "All" },
  { id: "dress-shirts", name: "Dress Shirts" },
  { id: "pants", name: "Pants" },
  { id: "jackets-coats", name: "Jackets & Coats" },
  { id: "sweaters", name: "Sweaters" },
  { id: "shirts", name: "Shirts" },
  { id: "other-menswear", name: "Other Menswear" },
];

const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "oldest", name: "Oldest First" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
];

export default function NavBar() {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [itemCount, setItemCount] = useState(135000);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [sortOption, setSortOption] = useState("newest");

  const addFilter = (category: string, value: string, label: string) => {
    setSelectedFilters((prev) => {
      const filtered = prev.filter((f) => f.category !== category);
      return [...filtered, { category, value, label }];
    });
    updateItemCount();
  };

  const removeFilter = (category: string) => {
    setSelectedFilters((prev) => prev.filter((f) => f.category !== category));
    updateItemCount();
  };

  const updateItemCount = () => {
    const randomCount = Math.floor(Math.random() * 100000) + 1000;
    setItemCount(randomCount);
  };

  const FilterSection = ({
    title,
    options,
    category,
  }: {
    title: string;
    options: SubCategory[] | Category[];
    category: string;
  }) => {
    const selectedFilter = selectedFilters.find((f) => f.category === category);
    const selectedSubcategory = selectedFilters.find(
      (f) => f.category === "subcategory"
    );

    return (
      <Collapsible
        open={expandedCategory === category}
        onOpenChange={() =>
          setExpandedCategory(expandedCategory === category ? null : category)
        }
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="font-medium">{title}</span>
            {category === "category" && selectedSubcategory ? (
              <Badge
                variant="secondary"
                className="bg-[#4CAF50]/10 text-[#4CAF50]"
              >
                {selectedSubcategory.label}
              </Badge>
            ) : (
              selectedFilter && (
                <Badge
                  variant="secondary"
                  className="bg-[#4CAF50]/10 text-[#4CAF50]"
                >
                  {selectedFilter.label}
                </Badge>
              )
            )}
          </div>
          {expandedCategory === category ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-white">
          <div className="p-4 space-y-2">
            {options.map((option) => (
              <button
                key={option.id}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-50 text-sm flex items-center"
                onClick={() => {
                  if ("backgroundColor" in option) {
                    setSelectedCategory(option as Category);
                    addFilter(category, option.id, option.name);
                  } else {
                    addFilter(category, option.id, option.name);
                  }
                  setExpandedCategory(null);
                }}
              >
                {"backgroundColor" in option && (
                  <div
                    className={`w-4 h-4 rounded-full ${option.backgroundColor} mr-2`}
                  />
                )}
                {option.name}
                {"subcategories" in option && option.subcategories && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

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
                    {selectedFilters.length > 0 && (
                      <Badge variant="secondary" className="ml-2 bg-white/20">
                        {selectedFilters.length}
                      </Badge>
                    )}
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
                    {/* Sort Options */}
                    <div className="p-4 border-b">
                      <h3 className="font-medium mb-2">Sort By</h3>
                      <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select sort option" />
                        </SelectTrigger>
                        <SelectContent>
                          {sortOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Categories */}
                    <FilterSection
                      title="Categories"
                      options={categories}
                      category="category"
                    />

                    {/* Product Types */}
                    <FilterSection
                      title="Product Type"
                      options={productTypes}
                      category="product-type"
                    />

                    {/* Price Range */}
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
                        <span className="font-medium">Price</span>
                        <ChevronRight className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4">
                        <div className="space-y-4">
                          <div className="px-2">
                            <Slider
                              value={priceRange}
                              min={0}
                              max={1000}
                              step={10}
                              minStepsBetweenThumbs={1}
                              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-black [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-sm [&_.range]:bg-[#4CAF50] [&_.range]:h-1.5"
                              onValueChange={(newValue) => {
                                setPriceRange(newValue);
                              }}
                            />
                          </div>
                          <div className="flex gap-4">
                            <div className="flex-1 space-y-1">
                              <label className="text-sm">Min Price</label>
                              <Input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => {
                                  const newMin = parseInt(e.target.value);
                                  setPriceRange([
                                    Math.min(newMin, priceRange[1]),
                                    priceRange[1],
                                  ]);
                                }}
                              />
                            </div>
                            <div className="flex-1 space-y-1">
                              <label className="text-sm">Max Price</label>
                              <Input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => {
                                  const newMax = parseInt(e.target.value);
                                  setPriceRange([
                                    priceRange[0],
                                    Math.max(newMax, priceRange[0]),
                                  ]);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Colors */}
                    <FilterSection
                      title="Color"
                      options={colors}
                      category="color"
                    />

                    {/* Sizes */}
                    <FilterSection
                      title="Size"
                      options={sizes}
                      category="size"
                    />

                    {/* Shipping Options */}
                    <FilterSection
                      title="Shipping"
                      options={shippingOptions}
                      category="shipping"
                    />

                    {/* Condition */}
                    <FilterSection
                      title="Condition"
                      options={conditions}
                      category="condition"
                    />
                  </div>

                  {/* Item Count & Apply Button */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">
                        {itemCount.toLocaleString()} Items
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFilters([])}
                      >
                        Reset
                      </Button>
                    </div>
                    <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                      Apply
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <Input
                className="flex-1 pl-3 bg-white/10 border-white/20 text-white placeholder:text-white/70"
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
      {selectedFilters.length > 0 && (
        <div className="bg-white/10 py-2">
          <div className="container mx-auto px-4 flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <Badge
                key={filter.category}
                variant="secondary"
                className="bg-white/20 text-white"
              >
                {filter.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-2 text-white hover:text-white/70"
                  onClick={() => removeFilter(filter.category)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}
      {selectedCategory && selectedCategory.subcategories && (
        <Sheet
          open={!!selectedCategory}
          onOpenChange={() => setSelectedCategory(null)}
        >
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>{selectedCategory.name}</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4">
              {selectedCategory.subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-50 text-sm"
                  onClick={() => {
                    addFilter("subcategory", subcategory.id, subcategory.name);
                    setSelectedCategory(null);
                  }}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </header>
  );
}
