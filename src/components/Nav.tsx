'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ShoppingCart, Search, Menu, X, Leaf, ChevronDown, User } from 'lucide-react'
import mongoose from 'mongoose'

type NavLink = {
  label: string
  sub?: string[]
}

const links: NavLink[] = [
  { label: 'Shop', sub: ['Fruits', 'Vegetables', 'Dairy', 'Bakery'] },
  { label: 'Offers' },
  { label: 'Deliver' },
]
interface IUser {
    _id?:mongoose.Types.ObjectId
    name:string
    email:string
    password? :string
    mobile?:string
    role: "user" | "deliveryBoy" | "admin"
    image?:string 
}  
function Nav({user}:{user:IUser }) {

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])
 
  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5, 20, 10, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #16a34a, #0d9488)' }}
            >
              <Leaf size={16} strokeWidth={2.5} className="text-white" />
            </div>

            <span className="text-white font-black text-xl" style={{ letterSpacing: '-0.03em' }}>
              Pix<span style={{ color: '#4ade80' }}>Mart</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <div key={link.label} className="relative">

                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === link.label ? null : link.label)
                  }
                  className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
                >
                  {link.label}

                  {link.sub && (
                    <ChevronDown
                      size={13}
                      className="opacity-50 transition-transform duration-200"
                      style={{
                        transform:
                          openDropdown === link.label
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                      }}
                    />
                  )}
                </button>

                {link.sub && openDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 mt-2 w-40 rounded-2xl overflow-hidden"
                    style={{
                      background: 'rgba(10, 25, 15, 0.97)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
                    }}
                  >
                    {link.sub.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">

            {/* Search */}
            {searchOpen ? (
              <div className="overflow-hidden transition-all duration-300" style={{ width: 180 }}>
                <input
                  ref={searchRef}
                  placeholder="Search groceries..."
                  onBlur={() => setSearchOpen(false)}
                  className="w-full bg-white/10 text-white text-sm px-3 py-2 rounded-xl outline-none placeholder:text-zinc-500 border border-white/10 focus:border-green-500/50"
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <Search size={18} />
              </button>
            )}

            {/* Cart */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200">
              <ShoppingCart size={18} />
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #16a34a, #0d9488)' }}
              >
                3
              </span>
            </button>

            {/* Desktop Account */}
            <button
              className="hidden md:flex items-center gap-2 pl-3 pr-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #16a34a22, #0d948822)',
                border: '1px solid rgba(22,163,74,0.3)',
              }}
            >
              <User size={15} />
              Account
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* Click outside dropdown */}
      {openDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed inset-x-0 top-16 z-40 md:hidden px-4 pt-2 pb-6"
          style={{
            background: 'rgba(5, 20, 10, 0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
          }}
        >
          {links.map((link) => (
            <div key={link.label}>

              <a
                href="#"
                className="block px-4 py-3.5 text-base font-medium text-zinc-300 hover:text-white border-b transition-colors duration-150"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>

              {link.sub &&
                link.sub.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-8 py-2.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-150"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}

            </div>
          ))}

          <a
            href="#"
            className="mt-4 mx-4 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #16a34a, #0d9488)' }}
          >
            <User size={15} />
            My Account
          </a>

        </div>
      )}
    </>
  )
}

export default Nav