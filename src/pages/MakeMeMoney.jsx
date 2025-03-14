import React from "react";
import "./MakeMeMoney.css";

const MakeMeMoney = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">💰 Welcome to Make Me Money 💰</h1>
      <p className="text-lg mb-4 text-center">
        This page is dedicated to displaying ads and earning revenue.
      </p>

      {/* Placeholder for future ad components */}
      <div className="w-full max-w-4xl border border-gray-300 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Sponsored Ads</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Placeholder Ad Boxes */}
          <div className="w-60 h-40 bg-gray-200 rounded-lg flex items-center justify-center">Ad 1</div>
          <div className="w-60 h-40 bg-gray-200 rounded-lg flex items-center justify-center">Ad 2</div>
          <div className="w-60 h-40 bg-gray-200 rounded-lg flex items-center justify-center">Ad 3</div>
        </div>
      </div>
    </div>
  );
};

export default MakeMeMoney;
