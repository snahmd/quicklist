import { Link } from "react-router-dom";
import {
  Eye,
  Heart,
  Share2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Filter,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ArticleDetail() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ];

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
              fill
              className="object-contain"
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
              <h1 className="text-3xl font-bold mb-2">Racing Bike 30'</h1>
              <p className="text-2xl font-bold text-[#4CAF50]">€70</p>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Street Number 154056, Dortmund</span>
            </div>

            <Link
              href="#"
              className="text-[#4CAF50] hover:underline inline-block"
            >
              Show on Google Maps
            </Link>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Info</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>189</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Online: 07.11.2024
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="font-semibold">Description</h2>
                  <p className="text-muted-foreground">
                    Cannondale R500 in top condition, with lighting kit, cup
                    holder and saddle bag with tools
                  </p>
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

                <div className="flex gap-2 mb-6">
                  <Badge variant="secondary">Bikes</Badge>
                  <Badge variant="secondary">Outdoor</Badge>
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
