import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Tables } from "@/types/supabase";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

interface SelectedFilter {
  filterType: string;
  value: string;
  id?: string;
}

interface Categories extends Tables<"categories"> {
  sub_categories: Tables<"sub_categories">[];
}
interface FilterSectionProps {
  title: string;
  categories: Categories[];
  setSelectedFilters: any;
}

const FilterCategorySection: React.FC<FilterSectionProps> = ({
  title,
  categories,
  setSelectedFilters,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null
  );
  const addFilter = (subcategory: Tables<"sub_categories">) => {
    setSelectedFilters((prev: SelectedFilter[]) => {
      const arr = [];
      for (const filter of prev) {
        if (filter.filterType === "sub_category") {
          arr.push({
            filterType: "sub_category",
            id: subcategory.id,
            value: subcategory.name,
          });
        } else {
          arr.push(filter);
        }
      }
      if (!prev.find((filter) => filter.filterType === "sub_category")) {
        arr.push({
          filterType: "sub_category",
          id: subcategory.id,
          value: subcategory.name,
        });
      }
      return arr;
    });
  };
  useEffect(() => {
    console.log(selectedCategory);
    console.log(!!selectedCategory);
    console.log(selectedCategory?.sub_categories.length);
    console.log(
      !!selectedCategory && selectedCategory.sub_categories.length > 0
    );
  }, [selectedCategory]);

  const [addBadge, setAddBadge] = useState<string | null>("");
  // addBadge == '' olabilir, baslangicta bu sekilde
  // collabsible triggerlar tiklandiginda calisan onOpenChange kullanilabilir
  // cunku open={} degerinin icindeki deger CollapsibleTrigger tiklandiginda degismeli
  // open neye bagli:
  // ilkin false olmali
  // addBadge durumuna gore degisebilir
  // tiklanma durumuna gore degisebilir

  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (addBadge !== "") {
      setOpen(false);
    }
  }, [addBadge]);

  return (
    <>
      <Collapsible
        open={open}
        onOpenChange={() => {
          console.log("tiklandi");
          setOpen(!open);
        }}
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="font-medium">{title}</span>
            {addBadge && (
              <Badge
                variant="secondary"
                className="bg-[#4CAF50]/10 text-[#4CAF50]"
              >
                {addBadge}
              </Badge>
            )}
          </div>
          {open ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-white">
          <div className="p-4">
            <div className="mt-2 space-y-2">
              {categories.map((category) => (
                <button
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-50 text-sm flex items-center"
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category);
                  }}
                >
                  {category.name}

                  {"sub_categories" in category && category.sub_categories && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Sheet
        open={!!selectedCategory}
        onOpenChange={() => setSelectedCategory(null)}
      >
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{selectedCategory?.name}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            {selectedCategory?.sub_categories.map((subcategory) => (
              <button
                key={subcategory.id}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-50 text-sm"
                onClick={() => {
                  addFilter(subcategory);
                  setAddBadge(subcategory.name);
                  setSelectedCategory(null);
                  console.log(`sub category tiklandi ${subcategory.name}`);
                }}
              >
                {subcategory.name}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FilterCategorySection;
