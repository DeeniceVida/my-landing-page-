import React, {useEffect, useState} from 'react'
export default function Cart(){
  const [cart, setCart] = useState([])
  useEffect(()=>{ const c = JSON.parse(localStorage.getItem('deenice_cart')||'[]'); setCart(c) },[])
  const total = cart.reduce((s,i)=>s + i.price * i.qty, 0)
  return (
    <div>
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="mt-3">
        {cart.length===0 ? <p>Your cart is empty.</p> : cart.map((it,idx)=>(<div key={idx} className="p-3 bg-white rounded mb-2"><strong>{it.title}</strong><div>{it.color} • qty {it.qty} • Ksh {it.price}</div></div>))}
        <div className="mt-3">Total: Ksh {total}</div>
        <div className="mt-3"><button className="px-4 py-2 bg-green-600 text-white rounded" onClick={()=>{ const msg = cart.map(it=>`${it.title} x${it.qty}`).join(', '); window.open('https://wa.me/254106590617?text='+encodeURIComponent(msg),'_blank') }}>Checkout via WhatsApp</button></div>
      </div>
    </div>
  )
}