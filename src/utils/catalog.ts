import { Category, Collection, Gender, Product, categories, collectionLabel, genderLabel, products } from "../data/products";

export const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export type Scope = {
  gender?: Gender;
  category?: Category;
  collection?: Collection | "new-arrivals";
  valid: boolean;
};

const isGender = (s?: string): s is Gender => s === "men" || s === "women";

/** Turns URL segments (/shop/:a/:b) into a catalogue scope. */
export function resolveScope(a?: string, b?: string): Scope {
  const scope: Scope = { valid: true };
  let rest = a;
  if (isGender(a)) { scope.gender = a; rest = b; } else if (b) { scope.valid = false; }
  if (rest) {
    const cat = categories.find(c => slugify(c) === rest);
    if (cat) scope.category = cat;
    else if (rest === "new-arrivals" || rest === "essentials" || rest === "overshirts" || rest === "relaxed") scope.collection = rest;
    else scope.valid = false;
  }
  return scope;
}

export const inCollection = (p: Product, c: Collection | "new-arrivals") =>
  c === "new-arrivals" ? p.badge === "NEW" : p.collections.includes(c);

/** Single source of truth for which products a page may show. */
export function productsForScope(scope: Scope): Product[] {
  if (!scope.valid) return [];
  return products.filter(p =>
    (!scope.gender || p.gender === scope.gender) &&
    (!scope.category || p.category === scope.category) &&
    (!scope.collection || inCollection(p, scope.collection)));
}

export const productsForGender = (g?: Gender) => (g ? products.filter(p => p.gender === g) : products);

export function scopeTitle(scope: Scope): string {
  if (!scope.valid) return "NOT FOUND";
  const parts: string[] = [];
  if (scope.gender) parts.push(genderLabel[scope.gender]);
  if (scope.collection) parts.push(collectionLabel[scope.collection]);
  if (scope.category) parts.push(scope.category);
  return parts.length ? parts.join(" — ").toUpperCase() : "SHOP ALL";
}

export const shopPath = (gender?: Gender, rest?: string) =>
  ["/shop", gender, rest].filter(Boolean).join("/");

/* ---------- search ---------- */
const words = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
const stem = (w: string) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w);

function haystack(p: Product): string[] {
  const cols = [...p.collections, ...(p.badge === "NEW" ? ["new-arrivals"] : [])].map(c => collectionLabel[c]);
  return [p.name, p.category, genderLabel[p.gender], ...cols, ...p.tags, p.badge ?? ""].flatMap(words).map(stem);
}

/** Every query word must prefix-match a word of the product's name, category, collection, gender or tags. */
export function matchesQuery(p: Product, query: string): boolean {
  const q = words(query).map(stem);
  if (!q.length) return true;
  const h = haystack(p);
  return q.every(t => h.some(w => w.startsWith(t)));
}

export function searchProducts(query: string, gender?: Gender): Product[] {
  return productsForGender(gender).filter(p => matchesQuery(p, query));
}

/** Which gender section the visitor is currently in (undefined = Shop All / neutral pages). */
export function genderFromPath(pathname: string): Gender | undefined {
  const shop = pathname.match(/^\/shop\/(men|women)(\/|$)/);
  if (shop) return shop[1] as Gender;
  const prod = pathname.match(/^\/product\/([^/]+)/);
  if (prod) return products.find(p => p.id === decodeURIComponent(prod[1]))?.gender;
  return undefined;
}
