import { Layout } from "@/components/layout";
import NFTCard from "@/components/NFTCard";
import Chatbot from "@/components/ui/ChatBot";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

function NFTMarketPlace() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-6 p-4">
        <div className="relative ">
          <Input
            placeholder="Search NFT's"
            className="h-12 bg-transparent pl-12 backdrop-blur-xl border-[#AD1AAF] w-[1000px] mx-auto text-center text-white"
          />

          <Search className="absolute top-6 right-36 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="pt-[30px] flex justify-center">
          <h1 className="font-oxaniumsemibold text-white text-[30px]">
            Tokenized NFTs
          </h1>
        </div>
        <div
          className="absolute  inset-[0px] top-[280px]  left-[-250px] bg-no-repeat  h-[500px]  opacity-90"
          style={{
            backgroundImage: "url('/images/Vector-1.png')",
          }}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <NFTCard />
          <NFTCard />
          <NFTCard />
          <NFTCard />
          <NFTCard />
        </div>
      </div>
      <Chatbot />
    </Layout>
  );
}

export default NFTMarketPlace;
