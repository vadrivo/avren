import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { genderLabel } from "../data/products";
import { genderFromPath, searchProducts } from "../utils/catalog";
import { money } from "../utils/money";
import ProductImage from "./ProductImage";

export default function SearchOverlay({close}:{close:()=>void}){
 const [q,setQ]=useState("");
 const {pathname}=useLocation();
 const gender=genderFromPath(pathname);
 const results=useMemo(()=>q.trim()?searchProducts(q,gender).slice(0,6):[],[q,gender]);
 return <div className="search-overlay"><div className="search-top"><span>SEARCH AVREN{gender?` — ${genderLabel[gender].toUpperCase()}`:""}</span><button onClick={close} aria-label="Close search"><X/></button></div><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="What are you looking for?"/>{!q&&<div className="trending"><p className="eyebrow">TRENDING</p><div>{["Essentials","Overshirts","Relaxed Trousers","New Arrivals"].map(x=><button key={x} onClick={()=>setQ(x)}>{x}</button>)}</div></div>}{q&&<div className="search-results">{results.length?results.map(p=><Link to={`/product/${p.id}`} onClick={close} key={p.id}><ProductImage product={p} alt={p.name} width={500} loading="lazy"/><span><b>{p.name}</b><small>{gender?p.category:`${genderLabel[p.gender]} · ${p.category}`}</small></span><strong>{money(p.price)}</strong></Link>):<div className="empty"><h3>NO PIECES FOUND.</h3><p>Try another search.</p></div>}</div>}</div>
}
