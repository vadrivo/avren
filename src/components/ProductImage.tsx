import { useEffect, useMemo, useState } from "react";
import type { Product } from "../data/products";

const fallbackPool: Record<string, string[]> = {
  "men:T-Shirts": [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891",
  ],
  "women:T-Shirts": [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  ],
  "men:Shirts": [
    "https://images.unsplash.com/photo-1603252109303-2751441dd157",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3",
  ],
  "women:Shirts": [
    "https://images.unsplash.com/photo-1626497764746-6dc36546b388",
    "https://images.unsplash.com/photo-1564257577054-8b4c0c5f9f3f",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  ],
  "men:Outerwear": [
    "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f",
    "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
  ],
  "women:Outerwear": [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  ],
  "men:Trousers": [
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    "https://images.unsplash.com/photo-1475180098004-ca77a66827be",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
  ],
  "women:Trousers": [
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  ],
  "men:Knitwear": [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  ],
  "women:Knitwear": [
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105",
    "https://images.unsplash.com/photo-1578681994506-b8f463449011",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  ],
  "men:Accessories": [
    "https://images.unsplash.com/photo-1521369909029-2afed882baee",
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  ],
  "women:Accessories": [
    "https://images.unsplash.com/photo-1544816155-12df9643f363",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  ],
};

const withParams = (url: string, width: number) =>
  `${url}?auto=format&fit=crop&w=${width}&q=82`;

type Props = {
  product: Product;
  className?: string;
  alt?: string;
  width?: number;
  loading?: "eager" | "lazy";
  source?: string;
};

export default function ProductImage({ product, className, alt, width = 1000, loading = "lazy", source }: Props) {
  const sources = useMemo(() => {
    const key = `${product.gender}:${product.category}`;
    const fallbacks = fallbackPool[key] ?? [];
    const preferred = source ? [source, ...product.images.filter(image => image !== source)] : product.images;
    return [...preferred, ...fallbacks]
      .filter(Boolean)
      .map(url => withParams(url.split("?")[0], width))
      .filter((url, index, all) => all.indexOf(url) === index);
  }, [product, width, source]);

  const [index, setIndex] = useState(0);
  useEffect(() => setIndex(0), [source]);
  const src = sources[Math.min(index, sources.length - 1)];

  return (
    <img
      className={className}
      src={src}
      alt={alt ?? product.name}
      loading={loading}
      onError={() => setIndex(current => Math.min(current + 1, sources.length - 1))}
    />
  );
}
