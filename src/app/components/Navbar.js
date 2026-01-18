'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import UserContext from '../context/userContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, setUser } = useContext(UserContext)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Tasks', href: '/showtasks' },
    { label: 'Add Task', href: '/addtasks' },
  ]

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout') // clears cookie
      setUser(undefined)
      router.push("/login")
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-widest text-white">
            TASK
            <span className="text-cyan-400 hover:text-fuchsia-500 transition-colors">
              MANAGER
            </span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-10 text-sm">
          {navItems.map((item) => (
            <li key={item.label} className="relative group">
              <Link
                href={item.href}
                className="text-white/80 hover:text-white transition"
              >
                {item.label}
              </Link>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-300 group-hover:w-full" />
            </li>
          ))}
        </ul>

        {/* DESKTOP AUTH BUTTON */}
        <div className="hidden md:block">
          {!user ? (
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:brightness-90 transition"
            >
              Get Started
            </Link>
          ) : (

            <span className="text-sm text-white/80 mr-4 space-x-4">
              Hi, <span className="font-semibold text-white">{user.name}</span>
              <button
                onClick={handleLogout}
                className=" cursor-pointer inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition"
              >
                Logout
              </button>
            </span>

          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="flex flex-col gap-6 px-6 pb-6 pt-4 bg-black/70 backdrop-blur-xl">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block text-white/80 hover:text-cyan-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {!user ? (
            <Link
              href="/login"
              className="mt-4 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 py-2 text-center text-sm font-medium text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout()
                setIsMenuOpen(false)
              }}
              className="mt-4 rounded-lg bg-red-500 py-2 text-sm font-medium text-white"
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
