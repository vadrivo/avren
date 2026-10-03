import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Journal from "./pages/Journal";

function ScrollToTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo(0,0)},[pathname]);return null}

function ShopRoute(){const {a,b}=useParams();return <Shop key={`${a??""}/${b??""}`} a={a} b={b}/>}

export default function App(){return <Layout><ScrollToTop/><Routes><Route path="/" element={<Home/>}/><Route path="/shop" element={<ShopRoute/>}/><Route path="/shop/:a" element={<ShopRoute/>}/><Route path="/shop/:a/:b" element={<ShopRoute/>}/><Route path="/product/:id" element={<ProductPage/>}/><Route path="/wishlist" element={<Wishlist/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/order-confirmation" element={<OrderConfirmation/>}/><Route path="/about" element={<About/>}/><Route path="/journal" element={<Journal/>}/><Route path="*" element={<Home/>}/></Routes></Layout>}
