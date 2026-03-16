"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { PlusCircle, Upload, X, Loader2 } from "lucide-react";
import axios from "axios";

/* ── Types ── */
interface FormState {
  name: string;
  category: string;
  unit: string;
  price: string;
  image: File | null;
  imagePreview: string | null;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

/* ── Initial state ── */
const INITIAL_FORM: FormState = {
  name: "",
  category: "",
  unit: "",
  price: "",
  image: null,
  imagePreview: null,
};

function AddGrocery() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Universal text / select handler ── */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ── Image file selection ── */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image file.",
      }));
      return;
    }

    if (form.imagePreview) URL.revokeObjectURL(form.imagePreview);

    const previewURL = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: file, imagePreview: previewURL }));
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  /* ── Remove selected image ── */
  const handleRemoveImage = () => {
    if (form.imagePreview) URL.revokeObjectURL(form.imagePreview);
    setForm((prev) => ({ ...prev, image: null, imagePreview: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ── Validation ── */
  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Grocery name is required.";
    if (!form.category) errs.category = "Please select a category.";
    if (!form.unit) errs.unit = "Please select a unit.";
    if (!form.price || Number(form.price) <= 0)
      errs.price = "Enter a valid price greater than 0.";
    return errs;
  };

  /* ── Submit ── */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Run validation first — stop if errors
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      setLoading(true);

      // Build multipart FormData
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("unit", form.unit);
      formData.append("price", form.price);
      if (form.image) {
        formData.append("image", form.image);
      }

      const result = await axios.post("/api/admin/add-grocery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Grocery added:", result.data);

      setSubmitted(true);

      // Reset form after success
      setTimeout(() => {
        if (form.imagePreview) URL.revokeObjectURL(form.imagePreview);
        setForm(INITIAL_FORM);
        setErrors({});
        setSubmitted(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }, 2000);

    } catch (error) {
      console.error("Failed to add grocery:", error);
      setErrors((prev) => ({
        ...prev,
        name: "Something went wrong. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen w-full items-center justify-center px-5 py-10 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 60% 0%, #052e16 0%, #0a0a0a 60%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* Full-page Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <Loader2 size={48} className="animate-spin text-green-400 mb-4" />
          <p className="text-sm text-zinc-300 tracking-wide">Adding grocery...</p>
        </div>
      )}

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

        {/* Success Banner */}
        {submitted && (
          <div className="mb-4 text-center text-sm text-green-400 bg-green-500/10 border border-green-500/30 rounded-lg py-2 px-3">
            ✅ Grocery added successfully!
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>

          {/* Grocery Name */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              Grocery Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="eg: Sweets, Milk..."
              className={`mt-1 w-full bg-white/5 border rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                errors.name ? "border-red-500/60" : "border-white/10"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Category + Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-zinc-300">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={`mt-1 w-full bg-zinc-900 border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                  errors.category ? "border-red-500/60" : "border-white/10"
                }`}
              >
                <option value="">Select Category</option>
                <option value="Fruits & Vegetables">Fruits &amp; Vegetables</option>
                <option value="Dairy & Eggs">Dairy &amp; Eggs</option>
                <option value="Rice, Atta & Grains">Rice, Atta &amp; Grains</option>
                <option value="Snacks & Biscuits">Snacks &amp; Biscuits</option>
                <option value="Spices & Masalas">Spices &amp; Masalas</option>
                <option value="Beverages & Drinks">Beverages &amp; Drinks</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Household Essentials">Household Essentials</option>
                <option value="Instant & Packaged Food">Instant &amp; Packaged Food</option>
                <option value="Baby & Pet Care">Baby &amp; Pet Care</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-red-400">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-300">
                Unit *
              </label>
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
                className={`mt-1 w-full bg-zinc-900 border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                  errors.unit ? "border-red-500/60" : "border-white/10"
                }`}
              >
                <option value="">Select Unit</option>
                <option value="Kg">Kg</option>
                <option value="Gram">Gram</option>
                <option value="Piece">Piece</option>
                <option value="Liter">Liter</option>
              </select>
              {errors.unit && (
                <p className="mt-1 text-xs text-red-400">{errors.unit}</p>
              )}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium text-zinc-300">
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="eg: 120"
              min="0"
              className={`mt-1 w-full bg-white/5 border rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                errors.price ? "border-red-500/60" : "border-white/10"
              }`}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-400">{errors.price}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {!form.imagePreview ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-green-500/40 text-green-400 hover:bg-green-500/10 transition"
              >
                <Upload size={16} />
                Upload image
              </button>
            ) : (
              <div className="relative w-full rounded-lg overflow-hidden border border-white/10">
                <img
                  src={form.imagePreview}
                  alt="Selected grocery"
                  className="w-full h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-blasck/60 hover:bg-black/80 text-white rounded-full p-1 transition"
                  title="Remove image"
                >
                  <X size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 flex items-center gap-1 text-xs bg-black/60 hover:bg-black/80 text-green-400 rounded-lg px-2 py-1 transition"
                >
                  <Upload size={12} />
                  Change
                </button>
              </div>
            )}

            {errors.image && (
              <p className="mt-1 text-xs text-red-400">{errors.image}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Adding...
              </>
            ) : (
              "Add Grocery"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGrocery;