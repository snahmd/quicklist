import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  MapPin,
  ChevronDown,
  ChevronUp,
  Package,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import { supabase } from "@/utils/supabaseClient";
import { useSearchParams } from "react-router-dom";
import { Tables } from "@/types/supabase";

// interface Product {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   location: string;
//   distance: string;
//   shipping: boolean;
//   images: string[];
//   seller: {
//     name: string;
//     rating: number;
//     reviews: number;
//     joinDate: string;
//     responseTime: string;
//   };
//   condition: string;
//   posted: string;
//   interested: number;
//   articles: number;
//   isAd?: boolean;
// }

interface Article extends Tables<"articles"> {
  images: string[];
}

// type Image = {
//   articleId: string;
//   imageUrl: string;
// };

type ArticleWithImage = Tables<"articles"> & {
  images: string[];
};

export default function Search() {
  const [products, setProducts] = useState<Article[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<ArticleWithImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const location = useLocation();

  const { name, id } = useParams();
  console.log(id);
  console.log(name);

  //   const products: Product[] = [
  //     {
  //       id: "1",
  //       title:
  //         "Ikea brand wooden table, used for 3 years, 100x70, industrial style",
  //       description:
  //         "The table is made of a rich, dark wood that gleams in the light. It has smooth, strong lines and sturdy legs that taper down to the floor...",
  //       price: 130,
  //       location: "Friedrichshain",
  //       distance: "7 km",
  //       shipping: true,
  //       images: [
  //         "/placeholder.svg?height=400&width=400",
  //         "/placeholder.svg?height=400&width=400",
  //         "/placeholder.svg?height=400&width=400",
  //       ],
  //       seller: {
  //         name: "Anna",
  //         rating: 5,
  //         reviews: 23,
  //         joinDate: "12.12.2021",
  //         responseTime: "1h",
  //       },
  //       condition: "Used",
  //       posted: "3 days ago",
  //       interested: 12,
  //       articles: 22,
  //     },

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

  const [searchParams, _] = useSearchParams();
  const query = searchParams.get("q");
  const category_name = searchParams.get("sub_category");
  const category_id = location.state.category_id as string;
  const min_price = searchParams.get("min-price");
  const max_price = searchParams.get("max-price");
  const condition = searchParams.get("condition");
  const shipping = searchParams.get("shipping");
  const color = searchParams.get("color");
  const price_type = searchParams.get("price-type");

  useEffect(() => {
    console.log({ query, category_name, category_id });
  }, [query, category_name, category_id]);

  useEffect(() => {
    if (!query) {
      return;
    }
    console.log("Searching for:", query);
    getArticles(query);
  }, [query]);

  const getArticles = async (query: any) => {
    // Temel sorguyu başlat
    let articlesQuery = supabase
      .from("articles")
      .select()
      .textSearch("title", query)
      .order("created_at", { ascending: false });

    // Filtreleri dinamik olarak ekle
    if (category_id) {
      articlesQuery = articlesQuery.eq("subcategory_id", category_id);
    }

    if (min_price) {
      articlesQuery = articlesQuery.gte("price", min_price);
    }

    if (max_price) {
      articlesQuery = articlesQuery.lte("price", max_price);
    }

    if (price_type) {
      articlesQuery = articlesQuery.eq("price_type", price_type);
    }

    if (condition) {
      articlesQuery = articlesQuery.eq("condition", condition);
    }

    if (shipping) {
      articlesQuery = articlesQuery.eq("shipping", shipping);
    }

    if (color) {
      articlesQuery = articlesQuery.eq("color", color);
    }

    const { data: articlesData, error } = await articlesQuery;

    if (error) {
      console.error(error);
      return;
    }
    // setProducts(data);

    const articlesWithImages = await Promise.all(
      articlesData.map(async (article) => {
        // Her bir ürünün resimlerini listele
        const { data: files, error } = await supabase.storage
          .from("article_images")
          .list(article.id);

        if (error) {
          console.error(
            `Error fetching images for article ${article.id}`,
            error
          );
          return { ...article, images: [] };
        }

        // Resimlerin public URL'lerini al
        const images = files.map((file) => {
          const { data } = supabase.storage
            .from("article_images")
            .getPublicUrl(`${article.id}/${file.name}`);
          return data.publicUrl;
        });

        return { ...article, images };
      })
    );

    setProducts(articlesWithImages);
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
        <Card className={`mb-6 `}>
          <CardContent className="p-6">
            <div className="flex flex-col justify-center items-center md:flex-row md:justify-start  gap-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">
                  <p className="text-lg font-semibold mb-4">
                    {products.length} Results for "{query}"
                  </p>
                </h1>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Listings */}
        <div className="space-y-4">
          {products.map((product) => (
            <Card key={product.id} className={`overflow-hidden `}>
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  {/* Product Image */}
                  <div
                    className="relative w-full sm:w-48 h-48 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="object-cover  w-full h-full"
                      />
                    ) : (
                      <img
                        src="https://placehold.co/400x400"
                        alt={product.title}
                        className="object-cover  w-full h-full"
                      />
                    )}

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
                      {product.postal_code}
                    </div>

                    {product.shipping === "Shipping Available" && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Package className="h-4 w-4" />
                        Shipping possible
                      </div>
                    )}
                    {product.shipping === "Pickup Only" && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Package className="h-4 w-4" />
                        Pickup Only
                      </div>
                    )}

                    {expandedProduct === product.id && (
                      <div className="mt-4 space-y-4 border-t pt-4">
                        {/* <div className="flex items-center gap-4">
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
                        </div> */}

                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="font-semibold mb-2">Description:</p>
                          <p className="text-sm text-muted-foreground">
                            {product.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p>Condition: {product.condition}</p>
                            {/* <p>Posted: {product.posted}</p> */}
                          </div>
                          <div>
                            <p>Members interested: {product.views}</p>
                            {/* <p>Articles: {product.articles}</p> */}
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
            {selectedProduct && selectedProduct.images.length > 0 ? (
              <img
                src={selectedProduct.images[currentImageIndex]}
                alt={selectedProduct.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src="https://placehold.co/400x400"
                alt={selectedProduct?.title}
                className="object-cover w-full h-full"
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
