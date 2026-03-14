'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Leaf,
  ChevronDown,
  User,
  LogOut,
  ShoppingBag
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

type NavLink = {
  label: string
  sub?: string[]
}

type NavClientProps = {
  userName: string | null
  userImage: string | null
  userRole: string | null
}

const links: NavLink[] = [
  { label: 'Shop', sub: ['Fruits', 'Vegetables', 'Dairy', 'Bakery'] },
  { label: 'Offers' },
  { label: 'Deliver' }
]

export default function NavClient({
  userName,
  userImage,
  userRole
}: NavClientProps) {

  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)

  const searchRef = useRef<HTMLInputElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setOpenDropdown(null)
        setProfileOpen(false)
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // ✅ Reusable admin link classes
  const adminLinkClass = "flex items-center gap-2 px-4 py-2 rounded-md border border-green-400/40 bg-green-900/60 text-green-300 font-medium text-sm shadow-md shadow-green-500/20 hover:border-green-400 hover:bg-green-800/80 hover:text-white hover:shadow-lg hover:shadow-green-400/50 hover:scale-105 transition-all duration-300"

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          background: scrolled ? 'rgba(5,20,10,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none'
        }}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-green-600">
              <Leaf size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">
              Pix<span className="text-green-400">Mart</span>
            </span>
          </Link>

          {/* Desktop Links for USER */}
          {userRole === "user" && (
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <div key={link.label} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.label ? null : link.label)
                    }
                    className="flex items-center gap-1 px-4 py-2 text-sm text-zinc-300 hover:text-white"
                  >
                    {link.label}
                    {link.sub && (
                      <ChevronDown
                        size={14}
                        className={`transition ${openDropdown === link.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {link.sub && openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute top-full left-0 mt-2 w-44 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl"
                      >
                        {link.sub.map((item) => (
                          <Link
                            key={item}
                            href="#"
                            className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800"
                          >
                            {item}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2">

            {/* Search (USER only) */}
            {userRole === "user" && (
              <div className="relative flex items-center">
                <AnimatePresence>
                  {searchOpen && (
                    <motion.input
                      ref={searchRef}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 180, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      placeholder="Search products..."
                      className="px-3 py-2 text-sm rounded-lg bg-zinc-800 text-white outline-none mr-2"
                    />
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 text-zinc-400 hover:text-white"
                >
                  <Search size={18} />
                </button>
              </div>
            )}

            {/* Cart (USER only) */}
            {userRole === "user" && (
              <button className="relative p-2 text-zinc-400 hover:text-white">
                <ShoppingCart size={18} />
                <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full bg-green-600 text-white">
                  3
                </span>
              </button>
            )}

            {/* ✅ ADMIN links — Desktop (was missing classNames before) */}
            {userRole === "admin" && (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/admin/add-grocery" className={adminLinkClass}>
                  ➕ Add Grocery
                </Link>
                <Link href="/admin/groceries" className={adminLinkClass}>
                  🥦 View Grocery
                </Link>
                <Link href="/admin/orders" className={adminLinkClass}>
                  📦 Manage Orders
                </Link>
              </div>
            )}

            {/* Profile */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-700 text-white text-sm"
              >
                {userImage ? (
                  <Image src={userImage} alt="avatar" width={26} height={26} className="rounded-md" />
                ) : (
                  <User size={16} />
                )}
                <span>{userName ?? 'Account'}</span>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg"
                  >
                    {userRole === "user" && (
                      <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800">
                        <ShoppingBag size={16} />
                        My Orders
                      </button>
                    )}
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-zinc-400"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 bg-zinc-900 md:hidden p-5 space-y-4 z-40"
          >
            {userRole === "user" && (
              <>
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href="#"
                    className="block py-3 border-b border-zinc-700 text-zinc-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}

            {/* ✅ ADMIN links — Mobile (removed hidden md:flex, now uses flex flex-col) */}
            {userRole === "admin" && (
              <div className="flex flex-col gap-3">
                <Link href="/admin/add-grocery" className={adminLinkClass}>
                  ➕ Add Grocery
                </Link>
                <Link href="/admin/groceries" className={adminLinkClass}>
                  🥦 View Grocery
                </Link>
                <Link href="/admin/orders" className={adminLinkClass}>
                  📦 Manage Orders
                </Link>
              </div>
            )}

            <button
              onClick={() => signOut()}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-green-600 text-white"
            >
              <LogOut size={16} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}