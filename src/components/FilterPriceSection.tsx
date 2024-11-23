import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "./ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "./ui/badge";

type Props = {
  title: string;
  priceRange: number[];
  setPriceRange: any;
  setSelectedFilters: any;
};

export default function FilterPriceSection({
  title,
  priceRange,
  setPriceRange,
}: Props) {
  const [chevron, setChevron] = useState(false);
  const handleChevronClick = () => {
    setChevron(!chevron);
  };
  return (
    <>
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
          <div className="flex items-center gap-2" onClick={handleChevronClick}>
            <span className="font-medium">{title}</span>
            {(priceRange[0] !== 0 || priceRange[1] !== 1000) && (
              <Badge
                variant="secondary"
                className="bg-[#4CAF50]/10 text-[#4CAF50]"
              >
                Price: {priceRange[0]} - {priceRange[1]}
              </Badge>
            )}
          </div>
          {chevron ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <div className="space-y-4">
            <div className="px-2">
              <Slider
                value={priceRange}
                min={0}
                max={1000}
                step={10}
                minStepsBetweenThumbs={1}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-black [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-sm [&_.range]:bg-[#4CAF50] [&_.range]:h-1.5"
                onValueChange={(newValue) => {
                  setPriceRange(newValue);
                }}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-sm">Min Price</label>
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const newMin = parseInt(e.target.value);
                    setPriceRange([
                      Math.min(newMin, priceRange[1]),
                      priceRange[1],
                    ]);
                  }}
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-sm">Max Price</label>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const newMax = parseInt(e.target.value);
                    setPriceRange([
                      priceRange[0],
                      Math.max(newMax, priceRange[0]),
                    ]);
                  }}
                />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
