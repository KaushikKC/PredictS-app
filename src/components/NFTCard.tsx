import Image from "next/image";
import astronautImage from "@/images/astronaut.png"; // Replace with the path to your astronaut image
import { Heart } from "lucide-react";

export default function NFTCard() {
  return (
    <div className="flex justify-center gap-6">
      {/* Card Wrapper */}
      <div className="relative w-[300px] bg-gradient-to-b from-gray-800 to-gray-900 p-4 rounded-2xl shadow-lg">
        {/* Card Image */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full border-2 border-green-400/50 blur-md" />
          </div>
          <Image
            src={astronautImage}
            alt="Astronaut"
            className="rounded-xl"
            layout="responsive"
          />
        </div>

        {/* Card Content */}
        <div className="mt-[-150px] bg-[#232323]/20 rounded-t-lg p-3 backdrop-blur-md z-10 relative">
          {/* Title */}
          <h3 className="text-white font-oxaniumbold text-lg font-bold">
            Will Bitcoin Hit $100k In November?
          </h3>

          {/* Subheading */}
          <p className="text-white font-oxaniummedium text-sm mt-2">
            40 SHARES ($ 654,874.86)
          </p>

          {/* Button */}
          {/* <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-lg text-sm font-medium transition">
            Get NFT
          </button> */}
          <div className="flex items-center justify-center mt-2">
            <div className="first-purple-bar"></div>
            <button className="border-[#AD1AAF] font-oxaniummedium border-2 px-10 bg-transparent backdrop-blur-xl text-white hover:text-white  hover:bg-[#AD1AAF]">
              Get NFT
            </button>
            <div className="last-purple-bar"></div>
          </div>
        </div>

        {/* Like Icon */}
        <div className="absolute top-4 right-4 bg-gray-800/50 p-2 rounded-bl-xl text-white flex items-center">
          <Heart className="h-3 w-3" />
          <span className="font-oxaniummedium ml-2 text-[12px]">123</span>
        </div>
      </div>
    </div>
  );
}
