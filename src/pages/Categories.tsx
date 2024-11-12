import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  image: string;
  backgroundColor: string;
  subcategories: Subcategory;
}

interface Subcategory {
  name: string;
}

export default function Categories() {
  const categories: Category[] = [
    {
      name: "Cars, Bikes & Boats",
      image: "cars-bikes-boats.jpg",
      backgroundColor: "bg-blue-50",
      subcategories: [
        { name: "Cars" },
        { name: "Car Parts & Tires" },
        { name: "Boats & Boat Accessories" },
        { name: "Bicycles & Accessories" },
        { name: "Motorcycles & Scooters" },
        { name: "Motorcycle Parts & Accessories" },
        { name: "Commercial Vehicles & Trailers" },
        { name: "Repairs & Services" },
        { name: "Caravans & Mobile Homes" },
        { name: "Other Cars, Bikes & Boats" },
      ],
    },
    {
      name: "Electronics",
      image: "electronics.jpg",
      backgroundColor: "bg-green-50",
      subcategories: [
        { name: "Audio & Hi-Fi" },
        { name: "Electronics Services" },
        { name: "Photography" },
        { name: "Phones" },
        { name: "Household Appliances" },
        { name: "Gaming Consoles" },
        { name: "Notebooks" },
        { name: "PCs" },
        { name: "PC Accessories & Software" },
        { name: "Tablets & Readers" },
        { name: "TV & Video" },
        { name: "Video Games" },
        { name: "Other Electronics" },
      ],
    },
    {
      name: "Home & Garden",
      image: "home-garden.jpeg",
      backgroundColor: "bg-yellow-50",
      subcategories: [
        { name: "Bathroom" },
        { name: "Office" },
        { name: "Decoration" },
        { name: "Home & Garden Services" },
        { name: "Garden Accessories & Plants" },
        { name: "Home Textiles" },
        { name: "DIY" },
        { name: "Kitchen & Dining Room" },
        { name: "Lighting" },
        { name: "Bedroom" },
        { name: "Living Room" },
        { name: "Other Home & Garden" },
      ],
    },
    {
      name: "Jobs",
      image: "jobs.jpg",
      backgroundColor: "bg-purple-50",
      subcategories: [
        { name: "Apprenticeships" },
        { name: "Construction, Trade & Manufacturing" },
        { name: "Office Work & Administration" },
        { name: "Gastronomy & Tourism" },
        { name: "Customer Service & Call Center" },
        { name: "Mini & Part-time Jobs" },
        { name: "Internships" },
        { name: "Social Sector & Nursing" },
        { name: "Transport, Logistics & Traffic" },
        { name: "Sales & Purchasing" },
        { name: "Other Jobs" },
      ],
    },
    {
      name: "Neighborhood Help",
      image: "neighborhood-help.jpg",
      backgroundColor: "bg-teal-50",
      subcategories: [{ name: "Neighborhood Help" }],
    },
    {
      name: "Services",
      image: "services.webp",
      backgroundColor: "bg-pink-50",
      subcategories: [
        { name: "Elderly Care" },
        { name: "Cars, Bikes & Boats" },
        { name: "Babysitting & Childcare" },
        { name: "Electronics" },
        { name: "Home & Garden" },
        { name: "Artists & Musicians" },
        { name: "Travel & Event" },
        { name: "Pet Care & Training" },
        { name: "Moving & Transport" },
        { name: "Other Services" },
      ],
    },
    {
      name: "Family, Kids & Baby",
      image: "family-kids-baby.png",
      backgroundColor: "bg-indigo-50",
      subcategories: [
        { name: "Elderly Care" },
        { name: "Baby & Kids Clothing" },
        { name: "Baby & Kids Shoes" },
        { name: "Baby Equipment" },
        { name: "Baby Seats & Car Seats" },
        { name: "Babysitting & Childcare" },
        { name: "Strollers & Buggies" },
        { name: "Kids' Furniture" },
        { name: "Toys" },
        { name: "Other Family, Kids & Baby" },
      ],
    },
    {
      name: "Pets",
      image: "pets.jpg",
      backgroundColor: "bg-orange-50",
      subcategories: [
        { name: "Fish" },
        { name: "Dogs" },
        { name: "Cats" },
        { name: "Small Animals" },
        { name: "Farm Animals" },
        { name: "Horses" },
        { name: "Pet Care & Training" },
        { name: "Missing Pets" },
        { name: "Birds" },
        { name: "Accessories" },
      ],
    },
    {
      name: "Fashion & Beauty",
      image: "fashion-beauty.jpg",
      backgroundColor: "bg-red-50",
      subcategories: [
        { name: "Beauty & Health" },
        { name: "Women's Clothing" },
        { name: "Women's Shoes" },
        { name: "Men's Clothing" },
        { name: "Men's Shoes" },
        { name: "Bags & Accessories" },
        { name: "Watches & Jewelry" },
        { name: "Other Fashion & Beauty" },
      ],
    },
    {
      name: "Courses & Classes",
      image: "courses-classes.jpg",
      backgroundColor: "bg-cyan-50",
      subcategories: [
        { name: "Beauty & Health" },
        { name: "Computer Courses" },
        { name: "Esotericism & Spirituality" },
        { name: "Cooking & Baking" },
        { name: "Art & Design" },
        { name: "Music & Singing" },
        { name: "Tutoring" },
        { name: "Sports Courses" },
        { name: "Language Courses" },
        { name: "Dance Courses" },
        { name: "Further Education" },
        { name: "Other Courses & Classes" },
      ],
    },
    {
      name: "Tickets",
      image: "tickets.jpg",
      backgroundColor: "bg-gray-50",
      subcategories: [
        { name: "Public Transport" },
        { name: "Comedy & Cabaret" },
        { name: "Vouchers" },
        { name: "Kids" },
        { name: "Concerts" },
        { name: "Sports" },
        { name: "Theater & Musical" },
        { name: "Other Tickets" },
      ],
    },
    {
      name: "Leisure, Hobbies & Neighborhood",
      image: "leisure-hobbies-neighborhood.jpg",
      backgroundColor: "bg-lime-50",
      subcategories: [
        { name: "Esotericism & Spirituality" },
        { name: "Food & Drink" },
        { name: "Leisure Activities" },
        { name: "Crafts & Handicrafts" },
        { name: "Art & Antiques" },
        { name: "Artists & Musicians" },
        { name: "Model Building" },
        { name: "Travel & Event Services" },
        { name: "Collecting" },
        { name: "Sports & Camping" },
        { name: "Flea Market" },
        { name: "Lost & Found" },
        { name: "Other Leisure, Hobbies & Neighborhood" },
      ],
    },
    {
      name: "Real Estate",
      image: "real-estate.jpg",
      backgroundColor: "bg-emerald-50",
      subcategories: [
        { name: "Temporary Housing & Shared Housing" },
        { name: "Containers" },
        { name: "Condos" },
        { name: "Vacation & Overseas Properties" },
        { name: "Garages & Parking Spaces" },
        { name: "Commercial Properties" },
        { name: "Land & Gardens" },
        { name: "Houses for Sale" },
        { name: "Houses for Rent" },
        { name: "Rental Apartments" },
        { name: "Moving & Transport" },
        { name: "Other Real Estate" },
      ],
    },
    {
      name: "Music, Movies & Books",
      image: "music-movies-books.jpg",
      backgroundColor: "bg-slate-100",
      subcategories: [
        { name: "Books & Magazines" },
        { name: "Office & Stationery" },
        { name: "Comics" },
        { name: "Textbooks, School & Study" },
        { name: "Movies & DVDs" },
        { name: "Music & CDs" },
        { name: "Musical Instruments" },
        { name: "Other Music, Movies & Books" },
      ],
    },
    {
      name: "Giveaways & Swaps",
      image: "giveaways-swaps.jpg",
      backgroundColor: "bg-red-50",
      subcategories: [
        { name: "Swaps" },
        { name: "Rentals" },
        { name: "Giveaways" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Buy & sell on your local classifieds platform
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover one of the largest marketplaces for buyers and sellers in
          your area
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            <Card
              className={`group hover:shadow-lg transition-shadow ${category.backgroundColor}`}
            >
              <CardContent className="p-2 sm:p-4 md:p-6">
                <div className="aspect-square relative mb-2 sm:mb-4 rounded-lg overflow-hidden">
                  <img
                    src={`/categories/${category.image}`}
                    alt={category.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-300 h-full"
                  />
                </div>
                <h2 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center truncate">
                  {category.name}
                </h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
