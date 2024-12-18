import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Maximize2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/utils/supabaseClient";
import { Tables } from "@/types/supabase";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import {
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUserContext } from "@/context/userContext";


// Types
interface UserProfile {
  id: string;
  name: string;
  initials: string;
  isFriendly: boolean;
  isPrivateUser: boolean;
  activeDate: string;
  responseTime: number;
  followers: number;
}

// interface Listing {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   isNegotiable: boolean;
//   location: string;
//   imageUrl: string;
//   date: string;
//   imageCount: number;
// }

// Mock Data
const mockUser: UserProfile = {
  id: "1",
  name: "Julia Begemann",
  initials: "JB",
  isFriendly: true,
  isPrivateUser: true,
  activeDate: "14.01.2013",
  responseTime: 10,
  followers: 14,
};

// const mockListings: Listing[] = [
//   {
//     id: "1",
//     title: "Babybadewanne mit Thermometer",
//     description:
//       "Hier biete ich die Badewanne meiner Tochter an. Sie wurde nur selten genutzt, somit keine...",
//     price: 18,
//     isNegotiable: false,
//     location: "49088 Osnabrück",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     date: new Date().toISOString(),
//     imageCount: 5,
//   },
//   {
//     id: "2",
//     title: "Cybex Aton B2 i-Size / Isofix Babyschale Autositz",
//     description:
//       "Ich biete hier die Babyschale meiner Tochter an. Natürlich unfallfrei, lediglich von einem Kind...",
//     price: 70,
//     isNegotiable: true,
//     location: "49088 Osnabrück",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     date: new Date().toISOString(),
//     imageCount: 5,
//   },
//   {
//     id: "3",
//     title: "Babywippe / Babyschaukel Joie Serina 2in1",
//     description:
//       "Ich biete hier meine Babywippe von Joie an. Sie ist elektrisch, kann vorwärts wie auch seitwärts...",
//     price: 50,
//     isNegotiable: true,
//     location: "49088 Osnabrück",
//     imageUrl: "/placeholder.svg?height=150&width=150",
//     date: "2024-03-10",
//     imageCount: 5,
//   },
// ];



// Components
const UserProfileCard = () =>{
  const { user } = useUserContext();
  const location = useLocation();
  const currentProfile = location.state.profile
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
  const [followers, setFollowers] = useState<Tables<"followers">[]>([]);
  

  const getAvatarImages = async () => {
     if (!currentProfile) return;
    const {data} = await supabase.storage.from("images").getPublicUrl(`${currentProfile?.id}/avatar.png`);
    
    console.log(data);
    setAvatarUrl(data);
  
  }

  useEffect(() => {
    if (currentProfile.id)
    getAvatarImages();
  }, [currentProfile])

  const getFollowers = async () => {
    const { data, error } = await supabase
      .from("followers")
      .select("*")
      .eq("follow", currentProfile.id);
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    console.log(currentProfile.id)
    setFollowers(data);
  }

  useEffect(() => {
    if (currentProfile && currentProfile.id)
    getFollowers();
  }, [currentProfile])

  


  return (
    <Card className="w-full">
      <CardContent className="pt-6 flex flex-col items-center">
      <Avatar className="h-24 w-24">
      <AvatarImage src={avatarUrl?.publicUrl} />
            <AvatarFallback className="text-2xl">
              {location.state.profile.profile_name[0]}
            </AvatarFallback>
      </Avatar>
          <h2 className="text-2xl font-bold">{location.state.profile.profile_name}</h2>
        <div className="flex flex-col items-center space-y-4">
          
          
          {/* {user.isFriendly && <Badge variant="secondary">Freundlich</Badge>} */}
          <div className="text-sm text-muted-foreground space-y-2">
            {/* <p>
              {user.isPrivateUser ? "Privater Nutzer" : "Gewerblicher Nutzer"}
            </p> */}
            {/* <p>Aktiv seit {user.activeDate}</p>
            <p className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Antwortet in der Regel innerhalb von {user.responseTime} Minuten
            </p> */}
            <p className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              {followers.length} Follower
            </p>
          </div>
          {/* // follower -> user_id, follow
          // follow herhangi birisi user.id ?
          // eger boyleyse button diabled yapilcak
          // kendini takip edemesin. nasil? bu sayfadaki id(currentProfile.id) ile user.id ayni mi? */}
          {
            user && (
              user.id === currentProfile.id ? null : ( followers.find(follower => follower.user_id === user.id) ?
                <Button className="w-full" disabled={true}>Allready Follow</Button> : <Button className="w-full">Follow</Button>
              )
            )
          }
        </div>
      </CardContent>
    </Card>
  );
};

type ArticleWithImage = Tables<"articles"> & { images: string[] };

const ListingCard: React.FC<{ listing: ArticleWithImage, setSelectedProduct : (data: ArticleWithImage)=>void }> = ({ listing, setSelectedProduct }) => {
  

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Product Image */}
          <div
                    className="relative w-full sm:w-48 h-48 cursor-pointer"
                    onClick={() => setSelectedProduct(listing)}
                  >
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="object-cover  w-full h-full"
                      />
                    ) : (
                      <img
                        src="https://placehold.co/400x400"
                        alt={listing.title}
                        className="object-cover  w-full h-full"
                      />
                    )}

                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                      <Maximize2 className="h-4 w-4 text-white" />
                    </div>
                  </div>

          <div className="p-4 flex-1">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              {/* <MapPin className="w-4 h-4 mr-1" />
              <span>{listing.location}</span> */}
            </div>
            <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {listing.description}
            </p>
            <p className="text-lg font-bold">
              {listing.price} € - {listing.price_type}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main App Component
const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("newest");

  const [sortedListings, setSortedListings] = useState<ArticleWithImage[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<ArticleWithImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  let sortedListing = [...sortedListings].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
    return a.price - b.price;
  });

  console.log(sortedListings)
  

  const profile = useLocation().state.profile;
  console.log(profile)

  const fetchProfileArticles = async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("user_id", profile.id);
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    // setProfileArticles(data);
    // setSortedListings(data);

    const articlesWithImages = await Promise.all(
      data.map(async (article: Tables<"articles">) => {
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
    setSortedListings(articlesWithImages);
  }



  useEffect(() => {
    fetchProfileArticles();
  }, [profile])

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div>
            <UserProfileCard />
          </div>
          <div>
            <div className="flex justify-end mb-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sortieren nach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Neueste zuerst</SelectItem>
                  <SelectItem value="cheapest">Günstigste zuerst</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              {sortedListing?.map((listing) => (
                <ListingCard key={listing.id} listing={listing} setSelectedProduct={setSelectedProduct} />
              ))}
            </div>
          </div>
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
};

export default App;
