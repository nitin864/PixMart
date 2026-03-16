"use client";

import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Fruits & Vegetables",
    icon: "🥦",
    color: "from-emerald-500/20 to-green-600/10",
    border: "border-emerald-500/30",
    text: "text-emerald-300",
    glow: "hover:shadow-emerald-500/20",
  },
  {
    name: "Dairy & Eggs",
    icon: "🥛",
    color: "from-sky-400/20 to-blue-500/10",
    border: "border-sky-400/30",
    text: "text-sky-300",
    glow: "hover:shadow-sky-400/20",
  },
  {
    name: "Rice, Atta & Grains",
    icon: "🌾",
    color: "from-amber-400/20 to-yellow-500/10",
    border: "border-amber-400/30",
    text: "text-amber-300",
    glow: "hover:shadow-amber-400/20",
  },
  {
    name: "Snacks & Biscuits",
    icon: "🍪",
    color: "from-orange-400/20 to-red-500/10",
    border: "border-orange-400/30",
    text: "text-orange-300",
    glow: "hover:shadow-orange-400/20",
  },
  {
    name: "Spices & Masalas",
    icon: "🌶️",
    color: "from-red-500/20 to-rose-600/10",
    border: "border-red-500/30",
    text: "text-red-300",
    glow: "hover:shadow-red-500/20",
  },
  {
    name: "Beverages & Drinks",
    icon: "🧃",
    color: "from-cyan-400/20 to-teal-500/10",
    border: "border-cyan-400/30",
    text: "text-cyan-300",
    glow: "hover:shadow-cyan-400/20",
  },
  {
    name: "Personal Care",
    icon: "🧴",
    color: "from-pink-400/20 to-fuchsia-500/10",
    border: "border-pink-400/30",
    text: "text-pink-300",
    glow: "hover:shadow-pink-400/20",
  },
  {
    name: "Household Essentials",
    icon: "🧹",
    color: "from-violet-400/20 to-purple-500/10",
    border: "border-violet-400/30",
    text: "text-violet-300",
    glow: "hover:shadow-violet-400/20",
  },
  {
    name: "Instant & Packaged Food",
    icon: "🍜",
    color: "from-lime-400/20 to-green-500/10",
    border: "border-lime-400/30",
    text: "text-lime-300",
    glow: "hover:shadow-lime-400/20",
  },
  {
    name: "Baby & Pet Care",
    icon: "🐾",
    color: "from-rose-400/20 to-pink-500/10",
    border: "border-rose-400/30",
    text: "text-rose-300",
    glow: "hover:shadow-rose-400/20",
  },
];

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

const headingVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

function CategorySlider() {
  return (
    <div
      className="w-full py-5"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Heading */}
      <motion.p
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-sm font-semibold text-zinc-400 uppercase tracking-widest px-4 mb-4"
      >
        Shop by Categories
      </motion.p>

      {/* Scrollable row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex gap-3 px-4 overflow-x-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat, index) => (
          <motion.button
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.08,
              y: -4,
              transition: { type: "spring", stiffness: 400, damping: 15 },
            }}
            whileTap={{ scale: 0.93 }}
            className={`
              group
            shrink-0
              flex flex-col items-center justify-center gap-2
              min-w-[120px] w-[120px]
              rounded-2xl
              border ${cat.border}
              bg-linear-to-br ${cat.color}
              backdrop-blur-md
              px-3 py-4
              cursor-pointer
              hover:shadow-lg ${cat.glow}
              hover:brightness-125
            `}
          >
            {/* Icon — bounces up on card hover */}
            <motion.span
              className="text-2xl leading-none select-none"
              whileHover={{ y: -3, rotate: [0, -8, 8, 0], transition: { duration: 0.4 } }}
            >
              {cat.icon}
            </motion.span>

            {/* Label */}
            <p
              className={`text-xs font-medium text-center leading-snug ${cat.text} line-clamp-2`}
            >
              {cat.name}
            </p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

export default CategorySlider;