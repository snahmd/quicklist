import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-kleidung.jpg";
import hero3 from "@/assets/hero-möbel.jpg";
import hero4 from "@/assets/images.jpeg";

export default function Hero() {
  return (
    <section className="container mx-auto py-12 px-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#4CAF50]">BUYING</span> OR{" "}
            <span className="text-[#4CAF50]">SELLING</span>
            <br />
            GOT EASY!
          </h1>
          <p className="text-gray-600 mb-8">
            Your ultimate marketplace for buying, selling, and discovering
            unique items. Join our community and create lasting connections
            through smooth transactions.
          </p>
          <div className="flex gap-4">
            <Button className="bg-[#4CAF50] hover:bg-[#45a049]">BUY NOW</Button>
            <Button
              variant="outline"
              className="border-[#4CAF50] text-[#4CAF50]"
            >
              POST AD
            </Button>
          </div>
        </div>
        <div className="relative h-[400px]">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={hero1}
              alt="Product 1"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={hero4}
              alt="Product 2"
              width={160}
              height={160}
              className="object-cover h-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={hero3}
              alt="Product 3"
              width={144}
              height={144}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
