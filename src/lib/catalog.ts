import phoneImage from "../assets/product-phone.jpg";
import sneakerImage from "../assets/product-sneaker.jpg";
import headphonesImage from "../assets/product-headphones.jpg";
import skincareImage from "../assets/product-skincare.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  seller: string;
  city: string;
  image: string;
  delivery: string;
  badge?: string;
};

export const products: Product[] = [
  { id: "ora-x-phone", name: "Ora X 5G Smartphone", category: "Phones", price: 285000, oldPrice: 319000, rating: 4.8, reviews: 126, seller: "Kamsi Mobile Hub", city: "Awka", image: phoneImage, delivery: "Delivery by Friday", badge: "-11%" },
  { id: "everyday-sneakers", name: "Everyday Court Sneakers", category: "Fashion", price: 38500, oldPrice: 45000, rating: 4.7, reviews: 84, seller: "Nwaanyị Styles", city: "Onitsha", image: sneakerImage, delivery: "Same-day delivery", badge: "-14%" },
  { id: "airwave-headphones", name: "Airwave Pro Headphones", category: "Electronics", price: 45000, oldPrice: 56000, rating: 4.9, reviews: 214, seller: "ABC Electronics", city: "Awka", image: headphonesImage, delivery: "Delivery by Thursday", badge: "JUSTBAY DEAL" },
  { id: "glow-set", name: "Daily Glow Skincare Set", category: "Beauty", price: 24500, rating: 4.6, reviews: 52, seller: "Amara Beauty Room", city: "Enugu", image: skincareImage, delivery: "Delivery by Friday" },
  { id: "pulse-earphones", name: "Pulse Wireless Earbuds", category: "Electronics", price: 28000, oldPrice: 35000, rating: 4.7, reviews: 98, seller: "ABC Electronics", city: "Awka", image: headphonesImage, delivery: "Delivery tomorrow", badge: "-20%" },
  { id: "classic-runner", name: "Classic City Runner", category: "Fashion", price: 42000, rating: 4.5, reviews: 41, seller: "Aba Footwear Co.", city: "Aba", image: sneakerImage, delivery: "Delivery by Saturday" },
  { id: "nova-phone", name: "Nova Lite Smartphone", category: "Phones", price: 198000, oldPrice: 225000, rating: 4.6, reviews: 73, seller: "Owerri Device Store", city: "Owerri", image: phoneImage, delivery: "Delivery by Friday", badge: "-12%" },
  { id: "radiance-serum", name: "Radiance Face Essentials", category: "Beauty", price: 18750, oldPrice: 22000, rating: 4.8, reviews: 64, seller: "Amara Beauty Room", city: "Enugu", image: skincareImage, delivery: "Delivery by Monday", badge: "-15%" },
];

export const categories = ["Phones", "Fashion", "Grocery", "Beauty", "Home", "Electronics"];
export const formatNaira = (value: number) => `₦${value.toLocaleString("en-NG")}`;