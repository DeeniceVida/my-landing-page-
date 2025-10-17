import React, {useEffect, useState} from 'react'

export default function Admin(){
  const [products, setProducts] = useState([])
  useEffect(()=>{ fetch('/products.json').then(r=>r.json()).then(setProducts) },[])
  function update(idx, field, value){ const copy = [...products]; copy[idx][field]=value; setProducts(copy) }
  function saveToLocal(){ localStorage.setItem('deenice_products', JSON.stringify(products)); alert('Saved to localStorage. To persist, download JSON and replace products.json in repo.') }
  function download(){ const blob = new Blob([JSON.stringify(products,null,2)], {type:'application/json'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'products.json'; a.click(); URL.revokeObjectURL(url) }
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="text-sm text-gray-600">Edit products below. Changes are kept in-memory; use "Download JSON" to export and replace products.json in your repo.</p>
      <div className="mt-4 space-y-4">
        {products.map((p,idx)=>(
          <div key={p.id} className="p-4 bg-white rounded shadow">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm">Title<input className="w-full p-2 border mt-1" value={p.title} onChange={e=>update(idx,'title',e.target.value)} /></label>
                <label className="block text-sm mt-2">Price<input className="w-full p-2 border mt-1" value={p.price} onChange={e=>update(idx,'price',Number(e.target.value))} /></label>
                <label className="block text-sm mt-2">Short<input className="w-full p-2 border mt-1" value={p.short} onChange={e=>update(idx,'short',e.target.value)} /></label>
              </div>
              <div style={{width:180}}>
                <div className="text-sm font-semibold mb-2">Images</div>
                {p.images.map((im,i)=>(<input key={i} className="w-full p-2 border mb-1" value={im} onChange={e=>{ const c=[...p.images]; c[i]=e.target.value; update(idx,'images',c) }} />))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={saveToLocal}>Save to localStorage</button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded" onClick={download}>Download JSON</button>
      </div>
    </div>
  )
}
