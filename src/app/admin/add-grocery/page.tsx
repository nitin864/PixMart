
import React from "react";
import Link from "next/link";
import { PlusCircle, Upload } from "lucide-react";
 

function AddGrocery() {
  return (
    <div
      className="flex flex-col min-h-screen w-full items-center justify-center px-5 py-10 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 60% 0%, #052e16 0%, #0a0a0a 60%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      

      {/* Back Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 text-sm text-green-300 hover:text-green-400"
      >
        ← Back to home
      </Link>

      {/* Glass Card */}
      <div
        className="w-full max-w-md
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-2xl
        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
        p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-2 text-green-400 mb-3">
          <PlusCircle size={20} />
          <h2 className="text-lg font-semibold">Add Your Grocery</h2>
        </div>

        <p className="text-sm text-zinc-400 text-center mb-6">
          Fill out the details below to add a new grocery item.
        </p>

        {/* Form */}
        <form className="space-y-4">
          {/* Grocery Name */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              Grocery Name *
            </label>

            <input
              type="text"
              placeholder="eg: Sweets, Milk..."
              className="mt-1 w-full
              bg-white/5
              border border-white/10
              rounded-lg
              px-3 py-2
              text-sm
              text-white
              placeholder:text-zinc-500
              focus:outline-none
              focus:ring-2
              focus:ring-green-500"
            />
          </div>

          {/* Category + Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-zinc-300">
                Category *
              </label>

              <select
                className="mt-1 w-full
                bg-white/5
                border border-white/10
                rounded-lg
                px-3 py-2
                text-sm
                text-white
                focus:outline-none
                focus:ring-2
                focus:ring-green-500"
              >
                <option>Select Category</option>
                <option>Fruits</option>
                <option>Vegetables</option>
                <option>Dairy</option>
                <option>Bakery</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300">
                Unit *
              </label>

              <select
                className="mt-1 w-full
                bg-white/5
                border border-white/10
                rounded-lg
                px-3 py-2
                text-sm
                text-white
                focus:outline-none
                focus:ring-2
                focus:ring-green-500"
              >
                <option>Select Unit</option>
                <option>Kg</option>
                <option>Gram</option>
                <option>Piece</option>
                <option>Liter</option>
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              Price *
            </label>

            <input
              type="number"
              placeholder="eg: 120"
              className="mt-1 w-full
              bg-white/5
              border border-white/10
              rounded-lg
              px-3 py-2
              text-sm
              text-white
              placeholder:text-zinc-500
              focus:outline-none
              focus:ring-2
              focus:ring-green-500"
            />
          </div>

          {/* Upload */}
          <button
            type="button"
            className="flex items-center gap-2
            text-sm
            px-3 py-2
            rounded-lg
            border border-green-500/40
            text-green-400
            hover:bg-green-500/10
            transition"
          >
            <Upload size={16} />
            Upload image
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-3
            bg-green-600
            hover:bg-green-700
            text-white
            font-medium
            py-2.5
            rounded-lg
            transition"
          >
            Add Grocery
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGrocery;

