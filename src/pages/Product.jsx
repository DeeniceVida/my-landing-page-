import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
export default function Product(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const [selectedColor, setSelectedColor] = useState('')
  useEffect(()=>{
    fetch('/products.json').then(r=>r.json()).then(list=>{
      const found = list.find(x=>x.id===id) || list[0]
      setP(found)
      setSelectedColor(found.colors[0].name)
    })
  },[id])
  if(!p) return <div>Loading...</div>
  return (
    <div>
      <h1 className="text-2xl font-bold">{p.title}</h1>
      <div className="gallery-swipe flex overflow-x-auto gap-2 my-4">
        {p.images.map((img,i)=>(<img key={i} src={img} className="w-full min-w-[300px] h-64 object-contain rounded" alt="slide" />))}
      </div>
      <h2 className="text-xl text-blue-600">Ksh {p.price.toLocaleString()}</h2>
      <div className="my-3" dangerouslySetInnerHTML={{__html:p.description}} />
      <div className="flex items-center gap-3">
        <div className="flex gap-2" role="list">
          {p.colors.map((c,idx)=>(
            <button key={idx} onClick={()=>setSelectedColor(c.name)} className={`p-1 border rounded ${selectedColor===c.name?'ring-2 ring-blue-200':''}`}>
              <img src={c.thumb} className="w-12 h-12 object-cover rounded" alt={c.name} />
            </button>
          ))}
        </div>
        <div className="selected-color-name">Selected: <strong>{selectedColor}</strong></div>
      </div>
      <div className="mt-4 flex gap-2">
        <select className="p-2 border rounded" defaultValue="1">
          {Array.from({length:10}).map((_,i)=>(<option key={i} value={i+1}>{i+1}</option>))}
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={()=>{
          const msg = `Hello, I'm interested in ${p.title} - ${selectedColor}`
          window.open('https://wa.me/254106590617?text='+encodeURIComponent(msg),'_blank')
        }}>Buy via WhatsApp</button>
      </div>
    </div>
  )
}