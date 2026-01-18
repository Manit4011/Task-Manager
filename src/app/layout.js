// layout.js
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import UserProvider from "./context/userProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          antialiased 
          min-h-screen 
          flex 
          flex-col
        `}
      >
        <UserProvider>
          {/* Fixed Navbar */}
          <Navbar />

          {/* MAIN CONTENT 
            Added pb-24 (padding-bottom) to ensure content never hits the footer 
        */}
          <main className="flex-1 pt-20 pb-24">
            {children}
          </main>

          {/* Footer stays at bottom */}
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}