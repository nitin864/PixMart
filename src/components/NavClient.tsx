'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ShoppingCart, Search, Menu, X, Leaf, ChevronDown, User } from 'lucide-react'
import Image from 'next/image'

type NavLink = {
  label: string
  sub?: string[]
}

type NavClientProps = {
  userName: string | null
  userImage: string | null
}

const links: NavLink[] = [
  { label: 'Shop', sub: ['Fruits', 'Vegetables', 'Dairy', 'Bakery'] },
  { label: 'Offers' },
  { label: 'Deliver' },
]

function NavClient({ userName, userImage }: NavClientProps) {
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
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(5,20,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-green-600">
              <Leaf size={16} className="text-white" />
            </div>

            <span className="text-white font-bold text-lg">
              Pix<span className="text-green-400">Mart</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
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
                      className={`transition ${
                        openDropdown === link.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {link.sub && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-40 rounded-xl bg-zinc-900 border border-zinc-700">

                    {link.sub.map((item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800"
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

          {/* Right Side */}
          <div className="flex items-center gap-2">

            {/* Search */}
            {searchOpen ? (
              <input
                ref={searchRef}
                placeholder="Search groceries..."
                onBlur={() => setSearchOpen(false)}
                className="w-40 px-3 py-2 text-sm rounded-lg bg-zinc-800 text-white"
              />
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-zinc-400 hover:text-white"
              >
                <Search size={18} />
              </button>
            )}

            {/* Cart */}
            <button className="relative p-2 text-zinc-400 hover:text-white">
              <ShoppingCart size={18} />

              <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center rounded-full bg-green-600 text-white">
                3
              </span>
            </button>

            {/* Desktop Account */}
            <button className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-green-700 text-white text-sm">

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

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-zinc-400"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-zinc-900 md:hidden p-4">

          {links.map((link) => (
            <div key={link.label}>

              <a
                href="#"
                className="block py-3 text-zinc-300 border-b border-zinc-700"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>

              {link.sub &&
                link.sub.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block pl-4 py-2 text-sm text-zinc-400"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}

            </div>
          ))}

          <a
            href="#"
            className="mt-4 flex items-center justify-center gap-2 py-3 rounded-lg bg-green-600 text-white"
          >
            {userImage ? (
              <Image src={userImage} alt="avatar" width={20} height={20} />
            ) : (
              <User size={16} />
            )}

            {userName ?? 'My Account'}
          </a>

        </div>
      )}
    </>
  )
}

export default NavClient