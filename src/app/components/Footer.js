// footer.js
import Link from 'next/link'

const Footer = () => {
  const footerLinks = {
    Resources: ['Docs', 'Tutorials'],
    Community: ['GitHub', 'Discord'],
    Legal: ['Privacy Policy', 'Terms & Conditions'],
  }

  return (
    // Added 'mt-auto' to force footer to the bottom of the flex container
    <footer className="mt-auto border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* ========== TOP SECTION ========== */}
        <div className="grid gap-10 md:grid-cols-4">
          
          {/* Logo */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-widest text-white">
              TASK
              <span className="text-cyan-400">MANAGER</span>
            </Link>
            <p className="mt-4 text-sm text-white/60">
              Manage your tasks efficiently and stay productive.
            </p>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase text-white">
                {title}
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:text-cyan-400 transition"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ========== DIVIDER ========== */}
        <div className="my-8 border-t border-white/10" />

        {/* ========== BOTTOM SECTION ========== */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} TaskManager. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 text-white/60">
            <a href="#" className="hover:text-white transition">GitHub</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer