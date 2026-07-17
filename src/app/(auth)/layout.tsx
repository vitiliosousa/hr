"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import authImage2 from "@/assets/fundo2.svg";
import authImage3 from "@/assets/loginImage.svg";

const authImages = [
  { src: authImage2, alt: "Imagem de fundo 1" },
  { src: authImage3, alt: "Imagem de fundo 2" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === authImages.length - 1 ? 0 : prev + 1
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-full font-montserrat bg-white">
      <div className="w-1/2 flex items-center justify-center p-10">
        {children}
      </div>
      <div className="w-1/2 h-full flex items-center justify-center relative overflow-hidden">
        <div className="relative h-[600px] w-[600px]">
          {authImages.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
        </div>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
          {authImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full ease-in-out duration-300 ${
                index === currentImageIndex ? "bg-mint w-6" : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
