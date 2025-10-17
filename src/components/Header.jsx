import React, {useState} from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header(){
  const [open, setOpen] = useState(false)
  const toggle = ()=> setOpen(o=>!o)
  return (
    <header className="bg-white/60 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        <button className="md:hidden" onClick={toggle} aria-label="menu">☰</button>
        <Link to="/" className="flex items-center gap-3">
          <img src="https://i.postimg.cc/fWrSZtm0/logo-2-copy-2x.png" alt="logo" className="header-logo" />
          <span className="sr-only">Deenice Finds</span>
        </Link>

        <nav className="hidden md:flex gap-4 ml-6 items-center">
          <NavLink to="/" end className={({isActive})=>isActive?'text-black font-semibold':'text-gray-600'}>Home</NavLink>
          <div className="group relative">
            <NavLink to="/products" className="text-gray-600">Products</NavLink>
            <div className="absolute left-0 mt-8 bg-white p-2 rounded shadow-lg hidden group-hover:block">
              <Link to="/products?cat=phones" className="block p-1">Phones</Link>
              <Link to="/products?cat=earbuds" className="block p-1">Earbuds</Link>
              <Link to="/products?cat=accessories" className="block p-1">Accessories</Link>
            </div>
          </div>
          <NavLink to="/blogs" className="text-gray-600">Blogs</NavLink>
          <NavLink to="/reviews" className="text-gray-600">Reviews</NavLink>
          <div className="group relative">
            <NavLink to="/services" className="text-gray-600">Services</NavLink>
            <div className="absolute left-0 mt-8 bg-white p-2 rounded shadow-lg hidden group-hover:block">
              <Link to="/buy-for-me" className="block p-1">Buy for me (US phones)</Link>
              <Link to="/collaborate" className="block p-1">Collaborate</Link>
            </div>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link to="/cart" className="text-black text-xl">🛒</Link>
          <Link to="/admin" className="text-sm px-3 py-1 rounded bg-gray-100">Admin</Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/80 p-4">
          <Link to="/" className="block py-2" onClick={()=>setOpen(false)}>Home</Link>
          <Link to="/products" className="block py-2" onClick={()=>setOpen(false)}>Products</Link>
          <Link to="/blogs" className="block py-2" onClick={()=>setOpen(false)}>Blogs</Link>
          <Link to="/services" className="block py-2" onClick={()=>setOpen(false)}>Services</Link>
          <Link to="/reviews" className="block py-2" onClick={()=>setOpen(false)}>Reviews</Link>
        </div>
      )}
    </header>
  )
}
