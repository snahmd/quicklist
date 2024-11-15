import {
  Eye,
  Heart,
  Share2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Filter,
  Package,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useParams } from "react-router-dom";
import { supabase } from "@/utils/supabaseClient";

export default function ArticleDetail() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentArticle, setCurrentArticle] = useState<any>({});
  // const images = [
  //   "/placeholder.svg?height=600&width=800",
  //   "/placeholder.svg?height=600&width=800",
  //   "/placeholder.svg?height=600&width=800",
  //   "/placeholder.svg?height=600&width=800",
  //   "/placeholder.svg?height=600&width=800",
  // ];
  const [images, setImages] = useState<string[]>([]);

  const { title, id } = useParams();
  console.log(title, id);

  const getArticle = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("id", id);
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    setCurrentArticle(data[0]);
  };

  useEffect(() => {
    getArticle();
  }, []);

  const getArticleImages = async () => {
    const { data: files, error } = await supabase.storage
      .from("article_images")
      .list(id as string);
    if (error) {
      console.error(error);
      return;
    }
    console.log(files);

    if (files.length > 0) {
      const imageUrls = files.map((file) => {
        const { data } = supabase.storage
          .from("article_images")
          .getPublicUrl(`${id}/${file.name}`);
        return data.publicUrl;
      });
      setImages(imageUrls);
    }
  };

  useEffect(() => {
    getArticleImages();
  }, []);

  return (
    <div>
      {/* Orange Header */}
      <div className="bg-orange-400 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" className="text-white p-2">
            <ArrowLeft className="h-6 w-6 mr-2" />
            Go Back
          </Button>
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-white mr-2" />
            <span className="text-white font-medium">Price: 45 - 110</span>
            <span className="text-white mx-2">|</span>
            <span className="text-white font-medium">
              Location: Dortmund 44147
            </span>
          </div>
          <Button variant="ghost" className="text-white">
            New Search
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
            <img
              src={images[currentImage]}
              alt={`Product image ${currentImage + 1}`}
              className="object-contain w-full h-full bg-white"
            />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === 0 ? images.length - 1 : prev - 1
                  )
                }
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/80 hover:bg-white"
                onClick={() =>
                  setCurrentImage((prev) =>
                    prev === images.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-2 py-1 rounded text-sm">
              {currentImage + 1}/{images.length}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {currentArticle.title}
              </h1>
              <p className="text-2xl font-bold text-[#4CAF50]">
                {currentArticle.price} €
              </p>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Street Number {currentArticle.postal_code}, Dortmund</span>
            </div>

            {/* <Link
              to="#"
              className="text-[#4CAF50] hover:underline inline-block"
            >
              Show on Google Maps
            </Link> */}

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Info</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{currentArticle.views}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Online:{" "}
                    {new Date(currentArticle.created_at).toLocaleDateString(
                      "de-DE"
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="font-semibold">Description</h2>
                  <p className="text-muted-foreground">
                    {currentArticle.description}
                  </p>
                </div>
                {currentArticle.shipping === "Shipping Available" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Package className="h-4 w-4" />
                    Shipping possible
                  </div>
                )}
                {currentArticle.shipping === "Pickup Only" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <MapPin className="h-4 w-4" />
                    Pickup Only
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                  <Tag className="h-4 w-4" />
                  Condition: {currentArticle.condition}
                </div>

                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Heart className="h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Ahmed San</h3>
                      <p className="text-sm text-muted-foreground">
                        private user since 05.11.2024
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>

                <Button className="w-full bg-[#4CAF50] hover:bg-[#45a049]">
                  Message Richard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
