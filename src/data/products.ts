export type Category =
  | "T-Shirts" | "Shirts" | "Outerwear" | "Trousers" | "Knitwear" | "Accessories";

export type Gender = "men" | "women";
export type Collection = "essentials" | "overshirts" | "relaxed";

export type Product = {
  id: string;
  gender: Gender;
  collections: Collection[];
  name: string;
  category: Category;
  price: number;
  description: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  tags: string[];
  stock: number;
  badge?: "NEW" | "BESTSELLER" | "SALE";
  images: string[];
  material: string;
  fit: string;
  care: string;
};

const img = (seed: string) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1000&q=82`;

export const products: Product[] = [
  { id:"tee-heavy", gender:"men", collections:["essentials", "relaxed"], name:"Essential Heavyweight Tee", category:"T-Shirts", price:999, description:"A substantial everyday tee with a clean neckline, relaxed body and a soft, structured hand feel.", colors:["Washed Black","Stone","Ecru"], sizes:["XS","S","M","L","XL"], rating:4.9,reviews:126,tags:["essential","heavyweight","everyday"],stock:3,badge:"BESTSELLER",material:"100% premium cotton",fit:"Relaxed fit",care:"Machine wash cold",images:[img("photo-1521572163474-6864f9cf17ab"),img("photo-1503342217505-b0a15ec3261c")] },
  { id:"tee-core", gender:"men", collections:["essentials"], name:"Core Cotton Tee", category:"T-Shirts", price:899, description:"A versatile midweight cotton tee designed to become the foundation of your daily wardrobe.", colors:["White","Charcoal","Olive"], sizes:["XS","S","M","L","XL"],rating:4.8,reviews:94,tags:["cotton","core","minimal"],stock:18,badge:"NEW",material:"100% combed cotton",fit:"Regular fit",care:"Machine wash cold",images:[img("photo-1523381210434-271e8be1f52b"),img("photo-1529139574466-a303027c1d8b")] },
  { id:"tee-relaxed", gender:"women", collections:["essentials", "relaxed"], name:"Relaxed Everyday Tee", category:"T-Shirts", price:999, description:"Soft, easy and slightly oversized — the tee made for slow mornings and late afternoons.", colors:["Mushroom","Black","Cloud"], sizes:["S","M","L","XL"],rating:4.7,reviews:61,tags:["relaxed","soft","daily"],stock:12,material:"240gsm organic cotton",fit:"Relaxed fit",care:"Wash inside out",images:[img("photo-1515886657613-9f3515b0c78f")] },
  { id:"shirt-overshirt", gender:"men", collections:["overshirts"], name:"Everyday Overshirt", category:"Shirts", price:2199, description:"A light structured layer with oversized utility pockets and a quietly considered silhouette.", colors:["Sand","Ink","Sage"], sizes:["S","M","L","XL"],rating:4.9,reviews:88,tags:["layering","utility","overshirt"],stock:7,badge:"NEW",material:"Cotton twill",fit:"Relaxed fit",care:"Dry clean recommended",images:[img("photo-1551488831-00ddcb6c6bd3"),img("photo-1552374196-c4e7ffc6e126")] },
  { id:"shirt-oxford", gender:"men", collections:["essentials", "relaxed"], name:"Studio Oxford Shirt", category:"Shirts", price:2099, description:"A modern Oxford with a soft collar and relaxed proportions, equally at home tucked or loose.", colors:["Oxford Blue","White","Charcoal"], sizes:["S","M","L","XL"],rating:4.8,reviews:73,tags:["oxford","studio","shirt"],stock:14,material:"100% cotton Oxford",fit:"Relaxed regular",care:"Machine wash cold",images:[img("photo-1603252109303-2751441dd157"),img("photo-1596755094514-f87e34085b2c")] },
  { id:"shirt-linen", gender:"women", collections:["relaxed"], name:"Relaxed Linen Shirt", category:"Shirts", price:1899, description:"Breathable linen with an easy drape for warm days, open windows and unhurried plans.", colors:["Natural","White","Olive"], sizes:["S","M","L","XL"],rating:4.8,reviews:55,tags:["linen","summer","relaxed"],stock:9,material:"100% European linen",fit:"Relaxed fit",care:"Gentle wash",images:[img("photo-1626497764746-6dc36546b388"),img("photo-1496747611176-843222e1e57c")] },
  { id:"outer-utility", gender:"men", collections:[], name:"Utility Jacket", category:"Outerwear", price:3999, description:"A compact utility jacket with practical pockets and a clean, architectural finish.", colors:["Faded Olive","Black"], sizes:["S","M","L","XL"],rating:4.9,reviews:42,tags:["utility","jacket","layer"],stock:4,badge:"BESTSELLER",material:"Cotton ripstop",fit:"Regular fit",care:"Spot clean",images:[img("photo-1544966503-7cc5ac882d5f")] },
  { id:"outer-bomber", gender:"men", collections:[], name:"Minimal Bomber", category:"Outerwear", price:3599, description:"A pared-back bomber with a softly structured shape and understated hardware.", colors:["Charcoal","Stone"], sizes:["S","M","L","XL"],rating:4.7,reviews:37,tags:["bomber","minimal","outerwear"],stock:11,material:"Recycled nylon",fit:"Regular fit",care:"Professional clean",images:[img("photo-1551028719-00167b16eac5"),img("photo-1523398002811-999ca8dec234")] },
  { id:"outer-structured", gender:"women", collections:["overshirts"], name:"Structured Overshirt", category:"Outerwear", price:3499, description:"The transitional layer between shirt and jacket, cut cleanly for effortless everyday dressing.", colors:["Taupe","Ink"], sizes:["S","M","L","XL"],rating:4.8,reviews:29,tags:["structured","layering","overshirt"],stock:16,material:"Brushed cotton",fit:"Boxy fit",care:"Machine wash cold",images:[img("photo-1539109136881-3be0616acf4b")] },
  { id:"trouser-relaxed", gender:"men", collections:["essentials", "relaxed"], name:"Relaxed Trousers", category:"Trousers", price:2299, description:"An easy straight leg with a considered rise and just enough room to move.", colors:["Black","Stone","Charcoal"], sizes:["28","30","32","34","36"],rating:4.9,reviews:113,tags:["trousers","relaxed","tailoring"],stock:8,badge:"BESTSELLER",material:"Cotton-viscose blend",fit:"Relaxed straight",care:"Machine wash cold",images:[img("photo-1473966968600-fa801b869a1a")] },
  { id:"trouser-chino", gender:"men", collections:["essentials"], name:"Everyday Chinos", category:"Trousers", price:2099, description:"Clean chinos with a soft hand and a tapered leg made for everyday rotation.", colors:["Khaki","Navy","Black"], sizes:["28","30","32","34","36"],rating:4.7,reviews:68,tags:["chino","everyday","smart"],stock:20,material:"Stretch cotton twill",fit:"Tapered fit",care:"Machine wash cold",images:[img("photo-1475180098004-ca77a66827be")] },
  { id:"trouser-wide", gender:"women", collections:[], name:"Wide-Leg Utility Pants", category:"Trousers", price:2999, description:"A confident wide-leg silhouette balanced by utility detailing and a clean waistband.", colors:["Olive","Washed Black"], sizes:["28","30","32","34","36"],rating:4.8,reviews:46,tags:["wide-leg","utility","modern"],stock:6,badge:"NEW",material:"Heavy cotton canvas",fit:"Wide leg",care:"Wash cold",images:[img("photo-1483985988355-763728e1935b")] },
  { id:"knit-essential", gender:"men", collections:["essentials"], name:"Essential Knit", category:"Knitwear", price:2299, description:"A fine-gauge everyday knit with a soft touch and a timeless crew neckline.", colors:["Ecru","Charcoal","Moss"], sizes:["S","M","L","XL"],rating:4.9,reviews:52,tags:["knit","crewneck","essential"],stock:10,material:"Merino wool blend",fit:"Regular fit",care:"Hand wash",images:[img("photo-1600185365483-26d7a4cc7519"),img("photo-1576566588028-4147f3842f27")] },
  { id:"knit-rib", gender:"women", collections:["relaxed"], name:"Soft Rib Sweater", category:"Knitwear", price:2499, description:"A tactile ribbed sweater with a relaxed shoulder and soft, substantial warmth.", colors:["Oat","Black"], sizes:["S","M","L","XL"],rating:4.8,reviews:34,tags:["rib","sweater","soft"],stock:5,material:"Wool-cotton blend",fit:"Relaxed fit",care:"Hand wash",images:[img("photo-1434389677669-e08b4cac3105"),img("photo-1578681994506-b8f463449011")] },
  { id:"cap", gender:"men", collections:["essentials"], name:"Everyday Cap", category:"Accessories", price:799, description:"A six-panel cotton cap finished with a subtle AVREN mark.", colors:["Black","Stone","Olive"], sizes:["One Size"],rating:4.7,reviews:81,tags:["cap","accessory","cotton"],stock:25,material:"Cotton canvas",fit:"Adjustable",care:"Spot clean",images:[img("photo-1521369909029-2afed882baee"),img("photo-1588850561407-ed78c282e89b")] },
  { id:"tote", gender:"women", collections:["essentials"], name:"Minimal Canvas Tote", category:"Accessories", price:899, description:"A durable everyday carry-all with generous proportions and an understated finish.", colors:["Natural","Black"], sizes:["One Size"],rating:4.8,reviews:63,tags:["tote","canvas","everyday"],stock:19,material:"Heavyweight canvas",fit:"One size",care:"Spot clean",images:[img("photo-1544816155-12df9643f363"),img("photo-1590874103328-eac38a683ce7")] },
  { id:"tee-soft-w", gender:"women", collections:["essentials"], name:"Soft Cotton Tee", category:"T-Shirts", price:999, description:"A soft, slightly cropped cotton tee with a clean neckline, made for easy everyday layering.", colors:["White","Black","Sage"], sizes:["XS","S","M","L"],rating:4.8,reviews:72,tags:["cotton","soft","minimal"],stock:15,badge:"NEW",material:"100% combed cotton",fit:"Regular fit",care:"Machine wash cold",images:[img("photo-1490481651871-ab68de25d43d"),img("photo-1496747611176-843222e1e57c")] },
  { id:"trouser-straight-w", gender:"women", collections:["essentials","relaxed"], name:"Relaxed Straight Trousers", category:"Trousers", price:2299, description:"A high-rise straight leg with an easy drape, designed to move from desk to dinner.", colors:["Black","Stone","Charcoal"], sizes:["XS","S","M","L","XL"],rating:4.8,reviews:58,tags:["trousers","relaxed","tailoring"],stock:13,material:"Cotton-viscose blend",fit:"Relaxed straight",care:"Machine wash cold",images:[img("photo-1594633312681-425c7b97ccd1")] },
];

export const categories = ["T-Shirts","Shirts","Outerwear","Trousers","Knitwear","Accessories"] as const;

export const genders: Gender[] = ["women", "men"];
export const genderLabel: Record<Gender, string> = { women: "Women", men: "Men" };
export const collectionLabel: Record<string, string> = {
  "new-arrivals": "New Arrivals",
  essentials: "Essentials",
  overshirts: "Overshirts",
  relaxed: "Relaxed",
};
