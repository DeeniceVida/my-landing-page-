import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Products from './pages/Products'
import Blogs from './pages/Blogs'
import Reviews from './pages/Reviews'
import Services from './pages/Services'
import BuyForMe from './pages/BuyForMe'
import Cart from './pages/Cart'
import Admin from './pages/Admin'
import Header from './components/Header'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/services" element={<Services />} />
          <Route path="/buy-for-me" element={<BuyForMe />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer className="bg-transparent py-6">
        <div className="container mx-auto text-center text-sm text-gray-600">© Deenice Finds — Plugged By the Best</div>
      </footer>
    </div>
  )
}
