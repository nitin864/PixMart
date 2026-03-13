'use client'

import { motion } from "framer-motion"
import { ShieldAlert, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function UnauthorizedPage() {

  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    const p = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10
    }))
    setParticles(p)
  }, [])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">

      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Grid glow animation */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Particle background */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/30"
          style={{
            width: p.size,
            height: p.size,
            top: `${p.y}%`,
            left: `${p.x}%`
          }}
          animate={{
            y: ["0%", "-120%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Glow effects */}
      <div className="absolute w-[600px] h-[600px] bg-red-500/20 blur-[180px] rounded-full top-[-200px] left-[-200px]" />
      <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[180px] rounded-full bottom-[-200px] right-[-200px]" />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg p-8 md:p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_80px_rgba(0,0,0,0.8)] text-center"
      >

        {/* Glowing Shield */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 20px rgba(255,80,80,0.4)",
              "0 0 50px rgba(255,80,80,0.9)",
              "0 0 20px rgba(255,80,80,0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mx-auto mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/40"
        >
          <ShieldAlert size={34} className="text-red-400" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Access Denied
        </h1>

        {/* Description */}
        <p className="text-zinc-400 mb-8 text-sm md:text-base">
          Security protocols prevented access to this resource.
          If you believe this is an error, please contact the administrator.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

        {/* Error Code */}
        <p className="text-xs text-zinc-500 mt-8">
          Error code: <span className="text-zinc-300">401 / Unauthorized</span>
        </p>

      </motion.div>

    </div>
  )
}