import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { categories, genderLabel, Gender } from "../data/products";
import { productsForGender, shopPath, slugify } from "../utils/catalog";

export default function Header({onSearch,onCart}:{onSearch:()=>void;onCart:()=>void}){
 const {cartCount,wishlist}=useStore(); const [menu,setMenu]=useState(false); const [mega,setMega]=useState<Gender|null>(null);
 const openCart=(e:React.MouseEvent)=>{if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();onCart()};
 return <header className="site-header">
  <div className="nav-desktop">
   <nav className="nav-left"><Link to="/shop/new-arrivals">NEW IN</Link><Link to="/shop">COLLECTIONS</Link><Link to="/journal">JOURNAL</Link><Link to="/about">ABOUT</Link></nav>
   <Link className="wordmark" to="/">AVREN</Link>
   <nav className="nav-right"><button onClick={()=>setMega(mega==="women"?null:"women")}>WOMEN</button><button onClick={()=>setMega(mega==="men"?null:"men")}>MEN</button><button aria-label="Search" onClick={onSearch}><Search size={16}/> SEARCH</button><Link to="/wishlist"><Heart size={16}/> <span className="desktop-count">WISHLIST</span><span className="mobile-count">({wishlist.length})</span></Link><Link to="/cart" onClick={openCart}><ShoppingBag size={16}/> BAG ({String(cartCount).padStart(2,"0")})</Link></nav>
  </div>
  {mega && <div className="mega" onMouseLeave={()=>setMega(null)}><div><p className="eyebrow">SHOP {mega.toUpperCase()}</p><Link to={shopPath(mega)} onClick={()=>setMega(null)}>All {genderLabel[mega]}</Link>{[["New Arrivals","new-arrivals"],["Essentials","essentials"],["Overshirts","overshirts"],["Relaxed","relaxed"],...categories.filter(c=>productsForGender(mega).some(p=>p.category===c)).map(c=>[c,slugify(c)])].map(([label,slug])=><Link key={slug} to={shopPath(mega,slug)} onClick={()=>setMega(null)}>{label}</Link>)}</div><img src={mega==="women"?"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80":"https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1000&q=80"} /></div>}
  <div className="nav-mobile"><button onClick={()=>setMenu(true)} aria-label="Open menu"><Menu/></button><Link className="wordmark" to="/">AVREN</Link><Link to="/cart" aria-label="Bag" onClick={openCart}><ShoppingBag/><b>{cartCount}</b></Link></div>
  {menu&&<div className="mobile-menu"><button className="close" onClick={()=>setMenu(false)}><X/></button><Link to="/shop/women" onClick={()=>setMenu(false)}>WOMEN</Link><Link to="/shop/men" onClick={()=>setMenu(false)}>MEN</Link><Link to="/shop" onClick={()=>setMenu(false)}>SHOP ALL</Link><Link to="/shop/new-arrivals" onClick={()=>setMenu(false)}>NEW ARRIVALS</Link><Link to="/shop" onClick={()=>setMenu(false)}>COLLECTIONS</Link><Link to="/journal" onClick={()=>setMenu(false)}>JOURNAL</Link><Link to="/about" onClick={()=>setMenu(false)}>ABOUT</Link><Link to="/wishlist" onClick={()=>setMenu(false)}>WISHLIST</Link><Link to="/cart" onClick={e=>{setMenu(false);openCart(e)}}>BAG ({cartCount})</Link><div className="mobile-help"><span>HELP</span><Link to="/about">Shipping</Link><Link to="/about">Returns</Link><Link to="/about">Size Guide</Link></div></div>}
 </header>
}