import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  image: string;
  backgroundColor: string;
}

export default function Categories() {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Buy & sell on your local classifieds platform
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover one of the largest marketplaces for buyers and sellers in
          your area
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            <Card
              className={`group hover:shadow-lg transition-shadow ${category.backgroundColor}`}
            >
              <CardContent className="p-2 sm:p-4 md:p-6">
                <div className="aspect-square relative mb-2 sm:mb-4 rounded-lg overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center truncate">
                  {category.name}
                </h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
