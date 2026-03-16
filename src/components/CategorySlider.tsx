"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

const categories = [
  { name: "Fruits & Vegetables", icon: "🥦" },
  { name: "Dairy & Eggs", icon: "🥛" },
  { name: "Rice, Atta & Grains", icon: "🌾" },
  { name: "Snacks & Biscuits", icon: "🍪" },
  { name: "Spices & Masalas", icon: "🌶️" },
  { name: "Beverages & Drinks", icon: "🧃" },
  { name: "Personal Care", icon: "🧴" },
  { name: "Household Essentials", icon: "🧹" },
  { name: "Instant & Packaged Food", icon: "🍜" },
  { name: "Baby & Pet Care", icon: "🐾" },
];

function CategorySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full py-6">

      {/* Header */}
      <div className="flex justify-between items-center px-4 mb-4">
        <h2 className="text-zinc-400 text-sm sm:text-base font-semibold uppercase tracking-widest">
          Shop by Categories
        </h2>

        {/* Desktop arrows */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={scrollLeft}
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            className="w-9 h-9 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="
        flex gap-3 sm:gap-4
        px-4
        overflow-x-auto
        scroll-smooth
        scrollbar-hide
        snap-x snap-mandatory
        "
      >
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
            snap-start
            flex-shrink-0
            
            w-[90px]
            sm:w-[110px]
            md:w-[120px]
            lg:w-[140px]

            h-[85px]
            sm:h-[95px]
            md:h-[105px]

            rounded-xl
            bg-zinc-800/80
            backdrop-blur
            border border-zinc-700
            
            flex flex-col
            items-center
            justify-center
            gap-2
            
            cursor-pointer
            hover:bg-zinc-700/80
            transition
            "
          >
            <span className="text-xl sm:text-2xl">{cat.icon}</span>

            <p className="text-[10px] sm:text-xs text-zinc-300 text-center leading-tight px-1">
              {cat.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CategorySlider;