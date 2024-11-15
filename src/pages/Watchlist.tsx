import { useState } from "react";
import { Link } from "react-router-dom";
import {
  X,
  MapPin,
  Star,
  ChevronDown,
  ChevronUp,
  Package,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  distance: string;
  shipping: boolean;
  images: string[];
  seller: {
    name: string;
    rating: number;
    reviews: number;
    joinDate: string;
    responseTime: string;
  };
  condition: string;
  posted: string;
  interested: number;
  articles: number;
  isAd?: boolean;
}

export default function CategoryDetail() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const watchlist = {
    id: "watchlist",
    name: "Watchlist",
    image: "/placeholder.svg?height=200&width=200",
    backgroundColor: "bg-emerald-50",
  };

  const products: Product[] = [
    {
      id: "1",
      title:
        "Ikea brand wooden table, used for 3 years, 100x70, industrial style",
      description:
        "The table is made of a rich, dark wood that gleams in the light. It has smooth, strong lines and sturdy legs that taper down to the floor...",
      price: 130,
      location: "Friedrichshain",
      distance: "7 km",
      shipping: true,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      seller: {
        name: "Anna",
        rating: 5,
        reviews: 23,
        joinDate: "12.12.2021",
        responseTime: "1h",
      },
      condition: "Used",
      posted: "3 days ago",
      interested: 12,
      articles: 22,
    },
    {
      id: "2",
      title:
        "Cozy table in wood, pick up only. Round and one chair additional (22€)",
      description:
        "A charming round wooden table perfect for intimate dinners or as a cozy breakfast nook. Comes with an optional matching chair...",
      price: 90,
      location: "Kreuzberg",
      distance: "2 km",
      shipping: false,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      seller: {
        name: "Max",
        rating: 4,
        reviews: 15,
        joinDate: "03.05.2022",
        responseTime: "3h",
      },
      condition: "Good",
      posted: "1 week ago",
      interested: 8,
      articles: 5,
    },
    {
      id: "3",
      title: "Modern glass coffee table, excellent condition",
      description:
        "Sleek and stylish glass coffee table with chrome legs. Perfect for contemporary living rooms...",
      price: 150,
      location: "Mitte",
      distance: "5 km",
      shipping: true,
      images: ["/placeholder.svg?height=400&width=400"],
      seller: {
        name: "Sophie",
        rating: 5,
        reviews: 31,
        joinDate: "17.09.2020",
        responseTime: "2h",
      },
      condition: "Like New",
      posted: "2 days ago",
      interested: 20,
      articles: 18,
    },
    {
      id: "4",
      title: "Vintage wooden dresser, beautifully restored",
      description:
        "A stunning piece of furniture history. This dresser has been carefully restored to its former glory...",
      price: 280,
      location: "Charlottenburg",
      distance: "10 km",
      shipping: true,
      images: [
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
        "/placeholder.svg?height=400&width=400",
      ],
      seller: {
        name: "Liam",
        rating: 4,
        reviews: 9,
        joinDate: "22.11.2022",
        responseTime: "5h",
      },
      condition: "Refurbished",
      posted: "5 days ago",
      interested: 15,
      articles: 3,
    },
    {
      id: "5",
      title: "Premium Furniture Store - 20% OFF on all items!",
      description:
        "Visit our store for high-quality furniture at unbeatable prices. Use code SUMMER20 for an extra 20% discount on all items!",
      price: 0,
      location: "Multiple Locations",
      distance: "Varies",
      shipping: true,
      images: ["/placeholder.svg?height=400&width=400"],
      seller: {
        name: "LuxeFurniture",
        rating: 4.5,
        reviews: 203,
        joinDate: "01.01.2019",
        responseTime: "1h",
      },
      condition: "New",
      posted: "Promoted",
      interested: 500,
      articles: 1000,
      isAd: true,
    },
  ];

  const toggleProductExpansion = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % selectedProduct.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + selectedProduct.images.length) %
          selectedProduct.images.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-[#9CCB3B] text-white p-4">
        <div className="container mx-auto">
          <Link to="/categories" className="text-white hover:underline">
            Back
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Selected Category Card */}
        <Card className={`mb-6 ${watchlist.backgroundColor}`}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                <img
                  src={watchlist.image}
                  alt={watchlist.name}
                  className="object-cover"
                />
              </div>
              <h1 className="text-2xl font-bold">{watchlist.name}</h1>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <Input
            type="search"
            placeholder="Search in this category..."
            className="max-w-xl"
          />
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="cursor-pointer">
              Distance
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Price
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Status
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Category
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Delivery
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              View by
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Other filters
            </Badge>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-lg font-semibold mb-4">129 Results for "Table"</p>

        {/* Product Listings */}
        <div className="space-y-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`overflow-hidden ${
                product.isAd ? "border-2 border-[#9CCB3B]" : ""
              }`}
            >
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Product Image */}
                  <div
                    className="relative w-full sm:w-48 h-48 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="object-cover"
                    />
                    <Badge
                      className={`absolute top-2 left-2 ${
                        product.isAd ? "bg-[#9CCB3B]" : ""
                      }`}
                    >
                      {product.isAd ? "Ad" : "Boost"}
                    </Badge>
                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                      <Maximize2 className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-semibold mb-2">{product.title}</h2>
                        <p className="text-xl text-[#9CCB3B] font-bold">
                          {product.price > 0
                            ? `${product.price}€`
                            : "See offer"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleProductExpansion(product.id)}
                      >
                        {expandedProduct === product.id ? (
                          <ChevronUp className="h-6 w-6" />
                        ) : (
                          <ChevronDown className="h-6 w-6" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <MapPin className="h-4 w-4" />
                      {product.location}, {product.distance}
                    </div>

                    {product.shipping && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Package className="h-4 w-4" />
                        Shipping possible
                      </div>
                    )}

                    {expandedProduct === product.id && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-semibold">
                              {product.seller.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Active since {product.seller.joinDate}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < product.seller.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-muted-foreground">
                              {product.seller.reviews} reviews
                            </span>
                          </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="font-semibold mb-2">Description:</p>
                          <p className="text-sm text-muted-foreground">
                            {product.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p>Condition: {product.condition}</p>
                            <p>Posted: {product.posted}</p>
                          </div>
                          <div>
                            <p>Members interested: {product.interested}</p>
                            <p>Articles: {product.articles}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <Dialog
        open={selectedProduct !== null}
        onOpenChange={() => {
          setSelectedProduct(null);
          setCurrentImageIndex(0);
        }}
      >
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="relative aspect-square">
            {selectedProduct && (
              <img
                src={selectedProduct.images[currentImageIndex]}
                alt={selectedProduct.title}
                className="object-cover"
              />
            )}
            <DialogClose className="absolute top-2 right-2 bg-white rounded-full p-2">
              <X className="h-4 w-4" />
            </DialogClose>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {selectedProduct?.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? "bg-white" : "bg-white/50"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
