import ArticleCard from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";

export default function Articles() {
  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-8">LATEST ADS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ArticleCard />
      </div>
      <div className="text-center mt-8">
        <Button variant="outline" className="border-[#4CAF50] text-[#4CAF50]">
          EXPLORE
        </Button>
      </div>
    </section>
  );
}
