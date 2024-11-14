import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function Articles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [currentArticles, setCurrentArticles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const handleClick = () => {
    const arr = [];
    for (let i = 0; i < page * 9 + 9; i++) {
      if (articles[i]) {
        arr.push(articles[i]);
      }
    }
    setCurrentArticles(arr);
    setPage(page + 1);
  };
  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase.from("articles").select("*");
      if (error) {
        console.error(error);
        return;
      }
      setArticles(data);
      const arr = [];
      for (let i = 0; i < 9; i++) {
        arr.push(data[i]);
      }
      setCurrentArticles(arr);
    };
    fetchArticles();
  }, []);
  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-8">LATEST ADS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ArticleCard articles={currentArticles} />
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
