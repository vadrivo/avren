import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import { matchesQuery, productsForScope, resolveScope, scopeTitle } from "../utils/catalog";

export default function Shop({a,b}:{a?:string;b?:string}){
 const scope=useMemo(()=>resolveScope(a,b),[a,b]);
 const base=useMemo(()=>productsForScope(scope),[scope]);
 const lo=base.length?Math.floor(Math.min(...base.map(p=>p.price))/100)*100:0;
 const hi=base.length?Math.ceil(Math.max(...base.map(p=>p.price))/100)*100:0;
 const [q,setQ]=useState("");const [sort,setSort]=useState("Featured");const [filter,setFilter]=useState(false);
 const [cat,setCat]=useState("");const [max,setMax]=useState(hi);const [color,setColor]=useState("");
 const colors=useMemo(()=>Array.from(new Set(base.flatMap(p=>p.colors))).sort(),[base]);
 const cats=categories.filter(c=>base.some(p=>p.category===c));
 const list=useMemo(()=>{
  let l=base.filter(p=>(!cat||p.category===cat)&&p.price<=max&&(!color||p.colors.includes(color))&&matchesQuery(p,q));
  if(sort==="Price: Low to High")l=[...l].sort((x,y)=>x.price-y.price);
  if(sort==="Price: High to Low")l=[...l].sort((x,y)=>y.price-x.price);
  if(sort==="Newest")l=[...l].reverse();
  if(sort==="Most Popular")l=[...l].sort((x,y)=>y.reviews-x.reviews);
  return l},[base,cat,max,color,q,sort]);
 return <main className="shop-page"><div className="shop-title"><p className="eyebrow">AVREN COLLECTION</p><h1>{scopeTitle(scope)}</h1><p>{scope.gender?`Explore the AVREN ${scope.gender}'s collection.`:"Explore the complete AVREN collection."}</p></div>
 <div className="shop-toolbar"><span>{list.length} pieces</span><button onClick={()=>setFilter(!filter)}><SlidersHorizontal size={15}/> Filters</button><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search collection"/><select value={sort} onChange={e=>setSort(e.target.value)}><option>Featured</option><option>Newest</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Most Popular</option></select></div>
 {filter&&<div className="filters">{!scope.category&&<label>Category<select value={cat} onChange={e=>setCat(e.target.value)}><option value="">All</option>{cats.map(c=><option key={c}>{c}</option>)}</select></label>}<label>Maximum price<input type="range" min={lo} max={hi} step="100" value={max} onChange={e=>setMax(+e.target.value)}/><span>{max.toLocaleString("en-IN")}</span></label><label>Color<select value={color} onChange={e=>setColor(e.target.value)}><option value="">All colors</option>{colors.map(c=><option key={c}>{c}</option>)}</select></label></div>}
 <div className="product-grid">{list.map(p=><ProductCard key={p.id} product={p}/>)}</div>
 {!list.length&&<div className="empty-page"><h2>NO MATCHES FOUND.</h2><p>Try searching for something else.</p></div>}</main>}
