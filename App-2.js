
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  { type: "Restaurant", image: "https://source.unsplash.com/400x300/?restaurant" },
  { type: "Music Venue", image: "https://source.unsplash.com/400x300/?concert" },
  { type: "Museum", image: "https://source.unsplash.com/400x300/?museum" },
  { type: "Park", image: "https://source.unsplash.com/400x300/?park" },
  { type: "Theater", image: "https://source.unsplash.com/400x300/?theater" },
  { type: "Sports Venue", image: "https://source.unsplash.com/400x300/?stadium" },
  { type: "Event Space", image: "https://source.unsplash.com/400x300/?event" },
  { type: "Historical Site", image: "https://source.unsplash.com/400x300/?history" },
  { type: "Cafe", image: "https://source.unsplash.com/400x300/?cafe" },
  { type: "Grocery Store", image: "https://source.unsplash.com/400x300/?grocery" }
];

const venues = {
  "Restaurant": [
    { name: "Woodberry Kitchen", address: "2010 Clipper Park Rd, Baltimore, MD 21211", url: "https://www.woodberrykitchen.com", image: "https://source.unsplash.com/400x300/?food" },
    { name: "Thames Street Oyster House", address: "1728 Thames St, Baltimore, MD 21231", url: "https://www.thamesoysterhouse.com", image: "https://source.unsplash.com/400x300/?seafood" },
  ],
  "Music Venue": [
    { name: "The Ottobar", address: "2549 North Howard Street, Baltimore, MD 21218", url: "http://www.theottobar.com", image: "https://source.unsplash.com/400x300/?livemusic" },
  ],
  "Museum": [
    { name: "Baltimore Museum of Art", address: "10 Art Museum Dr, Baltimore, MD 21218", url: "https://artbma.org", image: "https://source.unsplash.com/400x300/?art" },
  ],
  "Cafe": [
    { name: "Artifact Coffee", address: "1500 Union Ave, Baltimore, MD 21211", url: "https://www.artifactcoffee.com", image: "https://source.unsplash.com/400x300/?coffee" },
  ],
  "Grocery Store": [
    { name: "Whole Foods Market", address: "1001 Fleet St, Baltimore, MD 21202", url: "https://www.wholefoodsmarket.com", image: "https://source.unsplash.com/400x300/?grocery" },
  ]
};

export default function VenueSwipeApp() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedVenues, setLikedVenues] = useState([]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
  };

  const handleSwipe = (decision) => {
    if (decision === "yes") {
      setLikedVenues([...likedVenues, venues[selectedCategory][currentIndex]]);
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  if (!selectedCategory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold mb-4">Choose a Category</h1>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <motion.div key={cat.type} whileHover={{ scale: 1.05 }}>
              <Card onClick={() => handleCategorySelect(cat.type)} className="cursor-pointer">
                <img src={cat.image} alt={cat.type} className="w-full h-40 object-cover rounded-t-2xl" />
                <CardContent className="p-4 text-center font-bold">{cat.type}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (currentIndex >= venues[selectedCategory]?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold mb-4">You’ve gone through all {selectedCategory} venues!</h1>
        <p className="mb-4">Here are the ones you liked:</p>
        <ul className="list-disc text-left">
          {likedVenues.map((venue, index) => (
            <li key={index}>
              <a href={venue.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {venue.name}
              </a> - {venue.address}
            </li>
          ))}
        </ul>
        <Button onClick={() => setSelectedCategory(null)} className="mt-4">Restart</Button>
      </div>
    );
  }

  const currentVenue = venues[selectedCategory][currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        key={currentVenue.name}
        className="w-96 p-4 bg-white rounded-2xl shadow-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
      >
        <Card>
          <img src={currentVenue.image} alt={currentVenue.name} className="w-full h-40 object-cover rounded-t-2xl" />
          <CardContent>
            <h2 className="text-lg font-bold mb-2">{currentVenue.name}</h2>
            <p className="mb-2">Address: {currentVenue.address}</p>
            <a href={currentVenue.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              Visit Website
            </a>
          </CardContent>
        </Card>
      </motion.div>
      <div className="flex mt-4 space-x-4">
        <Button onClick={() => handleSwipe("no")} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
          No
        </Button>
        <Button onClick={() => handleSwipe("yes")} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
          Yes
        </Button>
      </div>
    </div>
  );
}
