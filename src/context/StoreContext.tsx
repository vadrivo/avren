import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Product, products } from "../data/products";

export type CartItem = Product & { quantity:number; selectedSize:string; selectedColor:string };

type Store = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (p:Product,size:string,color:string,quantity?:number)=>void;
  removeFromCart:(id:string,size:string,color:string)=>void;
  updateQuantity:(id:string,size:string,color:string,delta:number)=>void;
  toggleWishlist:(id:string)=>void;
  clearCart:()=>void;
  cartCount:number;
  subtotal:number;
  shipping:number;
  total:number;
};

const Ctx=createContext<Store|null>(null);
const load=<T,>(key:string,fallback:T):T=>{try{return JSON.parse(localStorage.getItem(key)||"null")??fallback}catch{return fallback}};

/** Saved carts may hold outdated product data (old prices, removed items) — refresh from the catalogue. */
const hydrate=(items:CartItem[]):CartItem[]=>Array.isArray(items)?items.flatMap(i=>{const p=products.find(x=>x.id===i.id);return p&&i.quantity>0?[{...p,selectedSize:i.selectedSize,selectedColor:i.selectedColor,quantity:i.quantity}]:[]}):[];

export function StoreProvider({children}:{children:ReactNode}){
  const [cart,setCart]=useState<CartItem[]>(()=>hydrate(load<CartItem[]>("avren-cart",[])));
  const [wishlist,setWishlist]=useState<string[]>(()=>load("avren-wishlist",[]));
  useEffect(()=>localStorage.setItem("avren-cart",JSON.stringify(cart)),[cart]);
  useEffect(()=>localStorage.setItem("avren-wishlist",JSON.stringify(wishlist)),[wishlist]);
  const addToCart=(p:Product,size:string,color:string,quantity=1)=>setCart(c=>{const i=c.findIndex(x=>x.id===p.id&&x.selectedSize===size&&x.selectedColor===color);if(i>-1){const n=[...c];n[i]={...n[i],quantity:n[i].quantity+quantity};return n}return [...c,{...p,selectedSize:size,selectedColor:color,quantity}]});
  const removeFromCart=(id:string,size:string,color:string)=>setCart(c=>c.filter(x=>!(x.id===id&&x.selectedSize===size&&x.selectedColor===color)));
  const updateQuantity=(id:string,size:string,color:string,delta:number)=>setCart(c=>c.map(x=>x.id===id&&x.selectedSize===size&&x.selectedColor===color?{...x,quantity:Math.max(1,x.quantity+delta)}:x));
  const toggleWishlist=(id:string)=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const subtotal=useMemo(()=>cart.reduce((s,x)=>s+x.price*x.quantity,0),[cart]);
  const shipping=subtotal===0?0:subtotal>=2999?0:199;
  const total=subtotal+shipping;
  return <Ctx.Provider value={{cart,wishlist,addToCart,removeFromCart,updateQuantity,toggleWishlist,clearCart:()=>setCart([]),cartCount:cart.reduce((s,x)=>s+x.quantity,0),subtotal,shipping,total}}>{children}</Ctx.Provider>
}
export const useStore=()=>{const c=useContext(Ctx);if(!c)throw new Error("useStore must be inside StoreProvider");return c};
