"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IGrocery } from "@/app/models/grocery.model";

function GroceryItemCard({ item }: { item: IGrocery }) {
  const [qty, setQty] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    setQty(1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 600);
  };

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => (q <= 1 ? 0 : q - 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="group relative flex flex-col rounded-2xl overflow-hidden
        bg-zinc-900 border border-zinc-800
        hover:border-zinc-600 hover:shadow-xl hover:shadow-black/40
        transition-colors duration-300"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Image area */}
      <div className="relative w-full aspect-square bg-zinc-800 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* subtle gradient overlay at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 p-3">
        {/* Name */}
        <p className="text-zinc-100 text-sm font-semibold leading-snug line-clamp-2">
          {item.name}
        </p>

        {/* Unit */}
        <p className="text-zinc-500 text-xs font-medium">{item.unit}</p>

        {/* Price + Cart controls */}
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-white text-sm font-bold">
            ₹{item.price}
          </span>

          <AnimatePresence mode="wait">
            {qty === 0 ? (
              /* Add button */
              <motion.button
                key="add"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAdd}
                className="relative px-3 py-1.5 rounded-xl text-xs font-bold
                  bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600
                  text-white transition-colors duration-150 overflow-hidden"
              >
                <AnimatePresence>
                  {justAdded && (
                    <motion.span
                      key="ripple"
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{ scale: 6, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-white"
                    />
                  )}
                </AnimatePresence>
                ADD
              </motion.button>
            ) : (
              /* Qty stepper */
              <motion.div
                key="stepper"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="flex items-center rounded-xl overflow-hidden
                  border border-emerald-500/50 bg-emerald-500/10"
              >
                <button
                  onClick={decrement}
                  className="w-7 h-7 flex items-center justify-center
                    text-emerald-400 hover:bg-emerald-500/20 active:bg-emerald-500/40
                    text-base font-bold transition-colors"
                >
                  −
                </button>
                <motion.span
                  key={qty}
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-6 text-center text-xs font-bold text-emerald-300 select-none"
                >
                  {qty}
                </motion.span>
                <button
                  onClick={increment}
                  className="w-7 h-7 flex items-center justify-center
                    text-emerald-400 hover:bg-emerald-500/20 active:bg-emerald-500/40
                    text-base font-bold transition-colors"
                >
                  +
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default GroceryItemCard;