"use client";

import { ClosedProposalCard } from "@/components/closed-proposal-card";
import { Layout } from "@/components/layout";
import MarketProposalModal from "@/components/marketProposalModel";
import { ProposalCard } from "@/components/proposal-card";
import Chatbot from "@/components/ui/ChatBot";
import React, { useState } from "react";

function Proposals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Layout>
      <section className="relative overflow-hidden px-4 pb-10 pt-16 md:px-6 md:pt-24">
        <div className="flex justify-center mb-10">
          <h1 className="font-oxaniumsemibold text-white text-[30px]">
            Voting Pannel
          </h1>
        </div>
        <div className="mx-[200px] flex items-center justify-end my-10  mt-2 z-10 relative">
          <div className="first-purple-bar"></div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border-[#AD1AAF] font-oxaniummedium border-2 py-2 px-10 bg-transparent backdrop-blur-xl text-white hover:text-white hover:bg-[#AD1AAF]"
          >
            Create New Market Proposal
          </button>
          <div className="last-purple-bar"></div>
        </div>
        {/* Render Modal */}
        {isModalOpen && (
          <MarketProposalModal onClose={() => setIsModalOpen(false)} />
        )}
        <div className="mx-[50px]">
          <p className="font-oxaniummedium text-white text-[30px]">
            Active Proposals
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ProposalCard
              title="Will Bitcoin Hit $100k In November?"
              ethValue="4.89"
              dollarValue="$654,874.86"
              likes={341}
              comments={412}
            />
            <ProposalCard
              title="Will Bitcoin Hit $100k In November?"
              ethValue="4.89"
              dollarValue="$654,874.86"
              likes={341}
              comments={412}
            />
            <ProposalCard
              title="Will Bitcoin Hit $100k In November?"
              ethValue="4.89"
              dollarValue="$654,874.86"
              likes={341}
              comments={412}
            />
          </div>
          <p className="font-oxaniummedium mt-10 text-white text-[30px]">
            Closed Proposals
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ClosedProposalCard
              title="Will Bitcoin Hit $100k In November?"
              ethValue="4.89"
              dollarValue="$654,874.86"
              likes={341}
              comments={412}
            />
            <ClosedProposalCard
              title="Will Bitcoin Hit $100k In November?"
              ethValue="4.89"
              dollarValue="$654,874.86"
              likes={341}
              comments={412}
            />
            <ClosedProposalCard
              title="Will Bitcoin Hit $100k In November?"
              ethValue="4.89"
              dollarValue="$654,874.86"
              likes={341}
              comments={412}
            />
          </div>
        </div>
      </section>
      <Chatbot />
    </Layout>
  );
}

export default Proposals;
