import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const [products, setProducts] = useState([])
  useEffect(()=>{ fetch('/products.json').then(r=>r.json()).then(setProducts) },[])
  return (
    <div>
      <section className="mb-6">
        <h1 className="text-2xl font-bold">Best-reviewed & tested items you can buy in Kenya</h1>
        <p className="text-gray-600">Premium gadgets & accessories — tested, trusted, and ready to ship.</p>
      </section>

      <section className="offers mb-6">
        <div className="offers-slider flex overflow-hidden" style={{touchAction:'pan-y'}}>
          <img src="https://i.postimg.cc/xT35t3WK/image.png" className="w-full object-cover rounded" alt="ad1" />
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-3">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0,10).map(p=>(
            <Link to={`/product/${p.id}`} key={p.id} className="card bg-white p-3 rounded shadow">
              <img src={p.images[0]} className="w-full h-40 object-cover rounded" alt={p.title} />
              <div className="mt-2 font-semibold">{p.title}</div>
              <div className="text-blue-600 font-bold">Ksh {p.price.toLocaleString()}</div>
              <div className="text-gray-500 text-sm">{p.short}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
