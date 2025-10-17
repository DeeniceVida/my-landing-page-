import React, {useState} from 'react'
export default function BuyForMe(){
  const [usd, setUsd] = useState(0)
  const rate = 135
  const calc = ()=>{
    const baseShipping = 20 + usd * 0.035
    const service = usd <= 750 ? 30 : usd * 0.045
    const totalUSD = usd + baseShipping + service
    return { baseShipping, service, totalUSD, totalKES: Math.round(totalUSD * rate) }
  }
  const r = calc()
  return (
    <div>
      <h1 className="text-2xl font-bold">Buy For Me (US phones)</h1>
      <div className="bfm-container mt-4 p-4 rounded">
        <label className="block">Product link<input className="w-full p-2 border mt-2" onChange={e=>{}} /></label>
        <label className="block mt-3">Price (USD)<input type="number" className="w-full p-2 border mt-2" value={usd} onChange={e=>setUsd(Number(e.target.value))} /></label>
        <div className="mt-3">Base shipping: ${r.baseShipping.toFixed(2)} <br/> Service: ${r.service.toFixed(2)} <br/> Total (KES): Ksh {r.totalKES}</div>
        <div className="mt-3"><a className="px-4 py-2 bg-blue-600 text-white rounded" href={`https://wa.me/254106590617?text=${encodeURIComponent('BuyForMe quote: USD '+usd)}`} target="_blank">Order via WhatsApp</a></div>
      </div>
    </div>
  )
}