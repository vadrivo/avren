import { ReactNode, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SearchOverlay from "./SearchOverlay";
import CartDrawer from "./CartDrawer";

export default function Layout({children}:{children:ReactNode}){
 const [search,setSearch]=useState(false);const [cart,setCart]=useState(false);
 return <><Header onSearch={()=>setSearch(true)} onCart={()=>setCart(true)}/>{children}<Footer/>{cart&&<><div onClick={()=>setCart(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.25)",zIndex:170}}/><CartDrawer close={()=>setCart(false)}/></>}{search&&<SearchOverlay close={()=>setSearch(false)}/>}</>
}
