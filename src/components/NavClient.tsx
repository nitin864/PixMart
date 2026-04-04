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

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Focus search */
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  /* Close on ESC */
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
    }

    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  /* Click outside close */
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
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.05)'
            : 'none'
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

          {/* Desktop Links */}
          {userRole === "user" && (
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <div key={link.label} className="relative">

                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === link.label ? null : link.label
                      )
                    }
                    className="flex items-center gap-1 px-4 py-2 text-sm text-zinc-300 hover:text-white"
                  >
                    {link.label}

                    {link.sub && (
                      <ChevronDown
                        size={14}
                        className={`transition ${openDropdown === link.label ? 'rotate-180' : ''
                          }`}
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

            {/* Search (only for user role) */}
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

            {/* Cart */}
            {userRole === "user" && (<>
              <button className="relative p-2 text-zinc-400 hover:text-white">
              <ShoppingCart size={18} />

              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full bg-green-600 text-white"
              >
                3
              </motion.span>
            </button>
            </>)}
            

            {/* Desktop profile */}
            <div className="relative hidden md:block">

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-700 text-white text-sm"
              >
                {userImage ? (
                  <Image
                    src={userImage}
                    alt="avatar"
                    width={26}
                    height={26}
                    className="rounded-md"
                  />
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
                    <button
                      onClick={() => null}
                      className='flex items-center gap-2 w-fu;; px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800'
                    >
                      <ShoppingBag size={16} />
                      My Orders
                    </button>
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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 bg-zinc-900 md:hidden p-5 space-y-4"
          >
            {links.map((link) => (
              <div key={link.label}>

                <Link
                  href="#"
                  className="block py-3 text-zinc-300 border-b border-zinc-700"
                >
                  {link.label}
                </Link>

                {link.sub?.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block pl-4 py-2 text-sm text-zinc-400"
                  >
                    {item}
                  </Link>
                ))}

              </div>
            ))}

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