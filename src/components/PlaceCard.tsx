"use client";

import Image from "next/image";
import { Heart, Star, MapPin, Coffee } from "lucide-react";

interface Place {
  id: string;
  name: string;
  location: string;
  rating: number;
  stars: number;
  amenitiesCount: number;
  reviewScore: number;
  reviewCount: number;
  reviewText: string;
  price: number;
  image: string;
  description?: string;
}

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <div className="bg-white w-full shadow-lg h-full flex items-center rounded-lg overflow-hidden">
      <div className="relative h-full w-1/2 min-h-[200px]">
        <Image
          src={place.image}
          alt={place.name}
          fill
          className="h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex justify-between flex-col w-full p-4 h-full space-y-4">
        <div className="flex w-full items-start justify-between">
          <div className="flex flex-col space-y-4">
            <h1 className="font-semibold">{place.name}</h1>
            <p className="text-xs flex gap-2">
              <MapPin className="size-4" />
              {place.location}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex text-mint">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-4"
                    fill={i < place.stars ? "#D3B58D" : "none"}
                    stroke="#D3B58D"
                  />
                ))}
                <p className="text-xs ml-2 text-black">{place.stars} Star</p>
              </div>

              <div>
                <p className="text-xs flex gap-1">
                  <Coffee className="size-4" />
                  {place.amenitiesCount}+ Aminities
                </p>
              </div>
            </div>

            <div className="flex items-center text-xs gap-2">
              <div className="border border-mint p-2 rounded">
                <p>{place.reviewScore.toFixed(1)}</p>
              </div>
              <p className="font-semibold">{place.reviewText}</p>
              <p>{place.reviewCount} reviews</p>
            </div>
          </div>

          <div className="flex flex-col h-full items-end">
            <p className="text-xs">Starting from</p>
            <h2 className="text-mint text-2xl font-semibold">
              ${place.price}
              <span className="text-xs">/night</span>
            </h2>
            <p className="text-xs">excl.tax</p>
          </div>
        </div>

        <hr />

        <div className="flex gap-2">
          <button
            className="border border-mint hover:border-mint rounded p-2 transition-colors hover:cursor-pointer hover:bg-mint"
            aria-label="Add to favorites"
          >
            <Heart className="size-4 text-black" fill="#000000" />
          </button>

          <button className="w-full bg-mint rounded text-xs font-semibold hover:bg-mint-dark transition-colors hover:cursor-pointer ease-in-out duration-300 hover:bg-mint">
            View Place
          </button>
        </div>
      </div>
    </div>
  );
}
