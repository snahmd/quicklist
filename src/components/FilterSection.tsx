import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Badge } from "./ui/badge";

type Props = {
  title: string;
  option: string[];
  setSelectedFilters: any;
};

export default function FilterSection({
  title,
  option,
  setSelectedFilters,
}: Props) {
  console.log(title, option, setSelectedFilters);

  const [addBadge, setAddBadge] = useState<string | null>("");

  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (addBadge !== "") {
      setOpen(false);
    }
  }, [addBadge]);
  useEffect(() => {
    console.log({ filterType: title, value: "New" });
  }, [setSelectedFilters]);
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
              {option.map((item, index) => (
                <button
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-gray-50 text-sm flex items-center"
                  key={index}
                  onClick={() => {
                    setSelectedFilters((prev: any) => [
                      ...prev,
                      { filterType: title.toLowerCase(), value: item },
                    ]);

                    setAddBadge(item);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
