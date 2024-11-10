import { useState, useEffect } from "react";
import { Camera, ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Category {
  id: string;
  name: string;
  subcategories?: {
    id: string;
    name: string;
    types?: { id: string; name: string }[];
  }[];
}

const categories: Category[] = [
  {
    id: "auto",
    name: "Auto, Bike & Boat",
    subcategories: [
      {
        id: "auto",
        name: "Auto",
        types: [
          { id: "repair", name: "Repairs" },
          { id: "rental", name: "Rental" },
        ],
      },
    ],
  },
  {
    id: "services",
    name: "Services",
    subcategories: [
      {
        id: "house-garden",
        name: "House & Garden",
        types: [
          { id: "cleaning", name: "Cleaning Service" },
          { id: "repair", name: "Repairs" },
          { id: "garden", name: "Gardening & Landscaping" },
        ],
      },
    ],
  },
  // You can add more categories as needed
];

const plzToLocation: { [key: string]: string } = {
  "13086": "Berlin - Weißensee",
  "12347": "Berlin - Britz",
  // You can add more postal codes as needed
};

export default function AddArticle() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Persistent selections
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  // Temporary selections
  const [tempSelectedCategory, setTempSelectedCategory] = useState<string>("");
  const [tempSelectedSubcategory, setTempSelectedSubcategory] =
    useState<string>("");
  const [tempSelectedType, setTempSelectedType] = useState<string>("");

  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    type: "offer", // or "search"
    title: "",
    category: "",
    price: "",
    priceType: "fixed",
    description: "",
    postalCode: "",
    location: "",
    name: "",
  });

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("createListingFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Save formData to localStorage whenever it changes
    localStorage.setItem("createListingFormData", JSON.stringify(formData));
  }, [formData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const postalCode = e.target.value;
    setFormData((prev) => ({
      ...prev,
      postalCode,
      location: plzToLocation[postalCode] || "",
    }));
  };

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Ad Details</h1>

      <form className="space-y-6">
        {/* Offer/Search Type */}
        <div className="space-y-2">
          <Label>Offer / Search</Label>
          <RadioGroup
            value={formData.type}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, type: value }))
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="offer" id="offer" />
              <Label htmlFor="offer">I am offering</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="search" id="search" />
              <Label htmlFor="search">I am searching</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <p className="text-sm text-gray-500">
            Tip: A descriptive title helps you sell better.
          </p>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                id="category"
                variant="outline"
                className="w-full justify-between"
                onClick={() => {
                  setIsDialogOpen(true);
                  // Set temporary selections to current selections
                  setTempSelectedCategory(selectedCategory);
                  setTempSelectedSubcategory(selectedSubcategory);
                  setTempSelectedType(selectedType);
                }}
              >
                {formData.category || "Choose your category"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Select Category</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-3 gap-4 h-[600px]">
                {/* Main Categories */}
                <div className="border-r">
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          tempSelectedCategory === category.id
                            ? "secondary"
                            : "ghost"
                        }
                        className="w-full justify-between"
                        onClick={() => {
                          setTempSelectedCategory(category.id);
                          setTempSelectedSubcategory("");
                          setTempSelectedType("");
                        }}
                      >
                        {category.name}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                <div className="border-r">
                  {tempSelectedCategory && (
                    <div className="space-y-1">
                      {categories
                        .find((c) => c.id === tempSelectedCategory)
                        ?.subcategories?.map((sub) => (
                          <Button
                            key={sub.id}
                            variant={
                              tempSelectedSubcategory === sub.id
                                ? "secondary"
                                : "ghost"
                            }
                            className="w-full justify-between"
                            onClick={() => {
                              setTempSelectedSubcategory(sub.id);
                              setTempSelectedType("");
                            }}
                          >
                            {sub.name}
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        ))}
                    </div>
                  )}
                </div>

                {/* Types */}
                <div>
                  {tempSelectedSubcategory && (
                    <div className="space-y-1">
                      {categories
                        .find((c) => c.id === tempSelectedCategory)
                        ?.subcategories?.find(
                          (s) => s.id === tempSelectedSubcategory
                        )
                        ?.types?.map((type) => (
                          <Button
                            key={type.id}
                            variant={
                              tempSelectedType === type.id
                                ? "secondary"
                                : "ghost"
                            }
                            className="w-full justify-between"
                            onClick={() => {
                              setTempSelectedType(type.id);
                            }}
                          >
                            {type.name}
                          </Button>
                        ))}
                    </div>
                  )}
                </div>
              </div>

              {/* "Continue" Button */}
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => {
                    // Make selections permanent
                    setSelectedCategory(tempSelectedCategory);
                    setSelectedSubcategory(tempSelectedSubcategory);
                    setSelectedType(tempSelectedType);

                    // Update category information
                    const category = categories.find(
                      (c) => c.id === tempSelectedCategory
                    );
                    const subcategory = category?.subcategories?.find(
                      (s) => s.id === tempSelectedSubcategory
                    );
                    const type = subcategory?.types?.find(
                      (t) => t.id === tempSelectedType
                    );

                    let categoryString = "";
                    if (category) {
                      categoryString = category.name;
                      if (subcategory) {
                        categoryString += ` > ${subcategory.name}`;
                        if (type) {
                          categoryString += ` > ${type.name}`;
                        }
                      }
                    }

                    setFormData((prev) => ({
                      ...prev,
                      category: categoryString,
                    }));

                    // Close the dialog
                    setIsDialogOpen(false);
                  }}
                >
                  Continue
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, price: e.target.value }))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priceType">Price Type</Label>
            <Select
              value={formData.priceType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, priceType: value }))
              }
            >
              <SelectTrigger id="priceType">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed Price</SelectItem>
                <SelectItem value="negotiable">Negotiable</SelectItem>
                <SelectItem value="giveaway">Giveaway</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <p className="text-sm text-gray-500">
            You have 4000 characters remaining
          </p>
        </div>

        {/* Images */}
        <div className="space-y-2">
          <Label>Images (recommended)</Label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <div className="flex items-start gap-4">
              <label className="w-32 h-32 relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Camera className="w-8 h-8 text-gray-400" />
                    <Plus className="w-4 h-4 text-green-500 absolute -bottom-1 -right-1 bg-white rounded-full" />
                  </div>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>

              {images.map((image, index) => (
                <div key={index} className="relative w-32 h-32 group">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="object-cover rounded-lg w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {images.length > 0 && (
              <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                <span>↔</span> Drag to rearrange order
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Tip: Upload up to 20 images with a maximum size of 12 MB each. Make
            your images perfect with our{" "}
            <a href="#" className="text-green-600 hover:underline">
              photo tips
            </a>
            .
          </p>
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={formData.postalCode}
              onChange={handlePostalCodeChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" value={formData.location} readOnly />
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        {/* Terms */}
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm">
            Yes, I agree to receive regular emails from you with product
            information, tips, promotions, and exciting stories about us and
            mobile.de - Unsubscribe at any time
          </Label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button variant="outline">Preview</Button>
          <Button type="submit">Post Ad</Button>
        </div>
      </form>
    </div>
  );
}
