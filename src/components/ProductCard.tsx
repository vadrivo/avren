import { Heart, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import { useStore } from "../context/StoreContext";
import { money } from "../utils/money";
import { useState } from "react";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const quick = () => {
    addToCart(product, product.sizes[0], product.colors[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <ProductImage product={product} alt={product.name} loading="lazy" />
        </Link>
        {product.badge && <span className="badge">{product.badge}</span>}
        <button className={`wish ${wishlist.includes(product.id) ? "active" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label="Wishlist">
          <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
        </button>
        <button className="quick" onClick={quick}>{added ? "ADDED" : "QUICK ADD"} <Plus size={14} /></button>
      </div>
      <div className="product-meta">
        <Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link>
        <span>{product.colors.length} colors</span>
        <strong>{money(product.price)}</strong>
      </div>
    </article>
  );
}
