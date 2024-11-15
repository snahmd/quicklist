import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export type Image = {
  articleId: string;
  imageUrl: string;
};

export default function Articles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [currentArticles, setCurrentArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [articleImages, setArticleImages] = useState<Image[]>([]);
  // const [articleIds, setArticleIds] = useState<any[]>([]);
  const handleClick = () => {
    const arr = [];
    const ids = [];
    for (let i = 0; i < page * 9 + 9; i++) {
      if (articles[i]) {
        arr.push(articles[i]);
        ids.push(articles[i].id);
      }
    }
    fetchArticleImages(ids);
    setCurrentArticles(arr);
    setPage(page + 1);
  };

  // 9 aritcle icin resim ceken fonk. article 10 tane resim var. her article icin 1 resim cek. 10->article_id

  const fetchArticleImages = async (articleIds: string[]) => {
    const newArray: Image[] = [];
    for (let i = 0; i < articleIds.length; i++) {
      const { data } = supabase.storage
        .from("article_images")
        .getPublicUrl(`${articleIds[i]}/image_${0}`);
      newArray.push({ articleId: articleIds[i], imageUrl: data.publicUrl });
    }

    setArticleImages(newArray);
  };

  // useEffect(() => {
  //   articleIds.length > 0 && fetchArticleImages(articleIds)
  // }, [articleIds]);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error(error);
        return;
      }
      setArticles(data);
      const arr = [];
      const ids = [];
      for (let i = 0; i < 9; i++) {
        arr.push(data[i]);
        ids.push(data[i].id);
        //setArticleIds((prev) => [...prev, data[i].id]);
      }
      fetchArticleImages(ids);
      // fonksiyonu cagiracagiz. article_idleri godnericez.
      setCurrentArticles(arr);
    };
    fetchArticles();
  }, []);
  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-8">LATEST ADS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ArticleCard articles={currentArticles} articleImages={articleImages} />
      </div>
      <div className="text-center mt-8">
        <Button
          variant="outline"
          className="border-[#4CAF50] text-[#4CAF50]"
          onClick={handleClick}
        >
          EXPLORE
        </Button>
      </div>
    </section>
  );
}
