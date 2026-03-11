'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Zap, Package, Star } from 'lucide-react'

const slides = [
  {
    id: 0,
    tag: 'Fresh Arrivals',
    tagIcon: Leaf,
    headline: 'Farm to\nYour Door',
    sub: 'Handpicked organic produce delivered within hours of harvest.',
    cta: 'Shop Fresh',
    accent: '#4ade80',
    accentDark: '#16a34a',
    bg: 'linear-gradient(135deg, #021a0a 0%, #052e16 40%, #0a0f0a 100%)',
    orbColor1: '#16a34a',
    orbColor2: '#065f46',
    emoji: '🥬',
    items: [
      { name: 'Spinach', icon: '🥬', price: '₹29' },
      { name: 'Kale', icon: '🥦', price: '₹49' },
      { name: 'Arugula', icon: '🌿', price: '₹39' },
      { name: 'Basil', icon: '🌱', price: '₹19' },
    ],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
  },
  {
    id: 1,
    tag: 'Daily Essentials',
    tagIcon: Zap,
    headline: 'Your Cart,\nDelivered Fast',
    sub: 'Groceries at your door in under 30 minutes. Every day, every time.',
    cta: 'Order Now',
    accent: '#fb923c',
    accentDark: '#ea580c',
    bg: 'linear-gradient(135deg, #1a0800 0%, #431407 40%, #0f0a0a 100%)',
    orbColor1: '#ea580c',
    orbColor2: '#9a3412',
    emoji: '⚡',
    items: [
      { name: 'Milk', icon: '🥛', price: '₹62' },
      { name: 'Eggs', icon: '🥚', price: '₹89' },
      { name: 'Bread', icon: '🍞', price: '₹45' },
      { name: 'Butter', icon: '🧈', price: '₹55' },
    ],
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  },
  {
    id: 2,
    tag: 'Seasonal Picks',
    tagIcon: Star,
    headline: 'Taste the\nSeason',
    sub: 'Curated seasonal bundles crafted by local farmers just for you.',
    cta: 'Explore Bundles',
    accent: '#a78bfa',
    accentDark: '#7c3aed',
    bg: 'linear-gradient(135deg, #0d0a1a 0%, #1e1b4b 40%, #0a0a0f 100%)',
    orbColor1: '#7c3aed',
    orbColor2: '#4c1d95',
    emoji: '🍓',
    items: [
      { name: 'Strawberry', icon: '🍓', price: '₹79' },
      { name: 'Mango', icon: '🥭', price: '₹120' },
      { name: 'Lychee', icon: '🍈', price: '₹99' },
      { name: 'Peach', icon: '🍑', price: '₹89' },
    ],
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80',
  },
  {
    id: 3,
    tag: 'Premium Quality',
    tagIcon: Package,
    headline: 'Nothing But\nThe Best',
    sub: 'Premium cuts, exotic ingredients, and gourmet finds — all in one place.',
    cta: 'Go Premium',
    accent: '#fbbf24',
    accentDark: '#d97706',
    bg: 'linear-gradient(135deg, #1a1200 0%, #3b2100 40%, #0f0a00 100%)',
    orbColor1: '#d97706',
    orbColor2: '#92400e',
    emoji: '🥩',
    items: [
      { name: 'Wagyu', icon: '🥩', price: '₹999' },
      { name: 'Truffle', icon: '🍄', price: '₹799' },
      { name: 'Saffron', icon: '🌸', price: '₹599' },
      { name: 'Caviar', icon: '🐟', price: '₹1299' },
    ],
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&q=80',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [animating, setAnimating] = useState(false)
  const [progress, setProgress] = useState(0)

  const goTo = useCallback(
    (index: number, dir: 1 | -1) => {
      if (animating || index === current) return
      setDirection(dir)
      setAnimating(true)
      setCurrent(index)
      setProgress(0)
      setTimeout(() => setAnimating(false), 900)
    },
    [animating, current]
  )

  const next = useCallback(() => goTo((current + 1) % slides.length, 1), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length, -1), [current, goTo])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          next()
          return 0
        }
        return p + 0.4
      })
    }, 30)

    return () => clearInterval(interval)
  }, [next])

  const slide = slides[current]
  const TagIcon = slide.tagIcon

  return (
    <section
      className="relative w-full overflow-hidden mt-6 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl"
      style={{ height: '90svh', minHeight: 640 }}
    >
      {/* Background */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ background: s.bg, opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Glow orbs */}
      <div
        className="absolute rounded-full blur-[160px]"
        style={{
          width: 700,
          height: 700,
          top: '-20%',
          right: '-10%',
          background: slide.orbColor1,
          opacity: 0.15,
        }}
      />

      <div
        className="absolute rounded-full blur-[160px]"
        style={{
          width: 500,
          height: 500,
          bottom: '-10%',
          left: '-10%',
          background: slide.orbColor2,
          opacity: 0.12,
        }}
      />

      {/* Layout */}
      <div className="relative z-20 h-full grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto px-8 md:px-16 gap-8 items-center">

        {/* LEFT CONTENT */}
        <div className="flex flex-col justify-center">

          <motion.div
            key={current}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5"
          >
            <span
              className="flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full w-fit"
              style={{
                color: slide.accent,
                background: slide.accent + '20',
                border: `1px solid ${slide.accent}40`,
              }}
            >
              <TagIcon size={12} />
              {slide.tag}
            </span>
          </motion.div>

          <h1
            className="font-black leading-none mb-5"
            style={{
              fontSize: 'clamp(3rem,6vw,6rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {slide.headline.split('\n').map((line, i) => (
              <span
                key={i}
                className="block"
                style={{ color: i === 1 ? slide.accent : '#fff' }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="text-zinc-400 text-lg max-w-md mb-8">{slide.sub}</p>

          {/* ITEMS */}
          <div className="flex flex-wrap gap-2 mb-8">
            {slide.items.map((item) => (
              <span
                key={item.name}
                className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 bg-white/5"
              >
                {item.icon} {item.name}
                <span style={{ color: slide.accent }}>{item.price}</span>
              </span>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold hover:scale-105 transition-all"
              style={{
                background: slide.accent,
                color: '#000',
                boxShadow: `0 10px 30px ${slide.accent}55`,
              }}
            >
              {slide.cta}
              <ArrowRight size={16} />
            </button>

            <button className="text-zinc-400 hover:text-white">
              View all deals →
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex justify-center">

          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-[380px] h-[420px] rounded-[28px] overflow-hidden border border-white/10"
            style={{
              boxShadow:
                '0 40px 120px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />

            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-xl text-xs font-bold"
              style={{ background: slide.accent, color: '#000' }}
            >
              {slide.emoji} {slide.tag}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl px-6 py-3">

        <div className="flex gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="h-[3px] rounded-full overflow-hidden"
              style={{
                width: i === current ? 50 : 16,
                background: 'rgba(255,255,255,0.2)',
              }}
            >
              {i === current && (
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: slide.accent,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">

          <span className="text-sm text-zinc-400">
            <b className="text-white">0{current + 1}</b> / 0{slides.length}
          </span>

          <button
            onClick={prev}
            className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: slide.accent, color: '#000' }}
          >
            <ChevronRight size={18} />
          </button>

        </div>
      </div>
    </section>
  )
}