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
import { Users, ImageIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/utils/supabaseClient";
import { Tables } from "@/types/supabase";

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
const UserProfileCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const location = useLocation();
  const currentProfile = location.state.profile
  const [avatarUrl, setAvatarUrl] = useState<any>(null);
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
              {user.followers} Follower
            </p>
          </div>
          <Button className="w-full">Folgen</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ListingCard: React.FC<{ listing: Tables<"articles"> }> = ({ listing }) => {
  

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-40 h-40">
            <img
              src="bckjdb"
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
              <ImageIcon className="w-3 h-3 mr-1" />
              {/* <span>{listing.imageCount}</span> */}
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

  const [sortedListings, setSortedListings] = useState<Tables<"articles">[]>([]);

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
    setSortedListings(data);
  }

  useEffect(() => {
    fetchProfileArticles();
  }, [profile])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div>
            <UserProfileCard user={mockUser} />
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
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
