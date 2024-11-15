import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { slug } from "@/utils/slug";
import { Image } from "@/pages/Articles";

export default function ArticleCard({
  articles,
  articleImages,
}: {
  articles: any[];
  articleImages: Image[];
}) {
  return (
    <>
      {articles.map((item) => (
        <Card key={item.id}>
          <Link to={`/article-detail/${slug(item.title)}/${item.id}`}>
            <CardContent className="p-4">
              <img
                src={
                  articleImages.filter(
                    (image) => image.articleId === item.id
                  )[0].imageUrl
                }
                alt={`Ad ${item}`}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {item.description.slice(0, 100)}...
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
