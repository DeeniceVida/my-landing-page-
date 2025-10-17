import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
export default function Products(){
  const [products, setProducts] = useState([])
  useEffect(()=>{ fetch('/products.json').then(r=>r.json()).then(setProducts) },[])
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(p=>(
          <Link to={`/product/${p.id}`} key={p.id} className="card bg-white p-3 rounded shadow">
            <img src={p.images[0]} className="w-full h-40 object-cover rounded" alt={p.title} />
            <div className="mt-2 font-semibold">{p.title}</div>
            <div className="text-blue-600 font-bold">Ksh {p.price.toLocaleString()}</div>
            <div className="text-gray-500 text-sm">{p.short}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}