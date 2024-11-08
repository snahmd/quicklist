import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function ArticleCard() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card key={item}>
          <Link to="article-detail">
            <CardContent className="p-4">
              <img
                src="/placeholder.svg?height=200&width=200"
                alt={`Ad ${item}`}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold mb-2">Product Title</h3>
              <p className="text-sm text-gray-600 mb-4">
                Brief description goes here...
              </p>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">Posted by User</span>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </>
  );
}
