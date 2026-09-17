import phoneImage from "../assets/product-phone.jpg";
import sneakerImage from "../assets/product-sneaker.jpg";
import headphonesImage from "../assets/product-headphones.jpg";
import skincareImage from "../assets/product-skincare.jpg";
import riceImage from "../assets/product-rice.jpg";
import laptopImage from "../assets/product-laptop.jpg";
import bagImage from "../assets/product-bag.jpg";
import homeImage from "../assets/product-home.jpg";

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

  { id: "golden-harvest-rice-10kg", name: "Golden Harvest Parboiled Rice 10kg", category: "Grocery", price: 32500, oldPrice: 36000, rating: 4.8, reviews: 312, seller: "Eke Awka Foodstuff", city: "Awka", image: riceImage, delivery: "Same-day delivery in Awka", badge: "-10%" },
  { id: "honeywell-semovita-5kg", name: "Family Semovita 5kg Pack", category: "Grocery", price: 9800, rating: 4.6, reviews: 148, seller: "Eke Awka Foodstuff", city: "Awka", image: riceImage, delivery: "Same-day delivery in Awka" },
  { id: "palm-oil-5-litres", name: "Pure Red Palm Oil 5 Litres", category: "Grocery", price: 14500, oldPrice: 16500, rating: 4.9, reviews: 203, seller: "Obosi Fresh Market", city: "Onitsha", image: riceImage, delivery: "Delivery by Thursday", badge: "-12%" },
  { id: "garri-ijebu-bucket", name: "Ijebu Garri Full Bucket", category: "Grocery", price: 11200, rating: 4.7, reviews: 96, seller: "Obosi Fresh Market", city: "Onitsha", image: riceImage, delivery: "Delivery tomorrow" },

  { id: "zenbook-core-i5", name: "ZenBook Slim Core i5 Laptop", category: "Electronics", price: 745000, oldPrice: 820000, rating: 4.8, reviews: 57, seller: "Ogbunike Computers", city: "Onitsha", image: laptopImage, delivery: "Delivery by Friday", badge: "-9%" },
  { id: "student-laptop-14", name: "Student Pro 14\" Laptop", category: "Electronics", price: 398000, rating: 4.5, reviews: 39, seller: "Ogbunike Computers", city: "Onitsha", image: laptopImage, delivery: "Delivery by Saturday" },
  { id: "enugu-smart-tv-43", name: "43\" Smart LED Television", category: "Electronics", price: 268000, oldPrice: 299000, rating: 4.6, reviews: 88, seller: "Coal City Electronics", city: "Enugu", image: laptopImage, delivery: "Free delivery within Enugu", badge: "JUSTBAY DEAL" },
  { id: "power-inverter-1kva", name: "1kVA Home Power Inverter", category: "Electronics", price: 315000, rating: 4.7, reviews: 44, seller: "Coal City Electronics", city: "Enugu", image: laptopImage, delivery: "Delivery by Monday" },

  { id: "aba-leather-handbag", name: "Aba Leather Tote Handbag", category: "Fashion", price: 27500, oldPrice: 34000, rating: 4.8, reviews: 121, seller: "Ariaria Leather Works", city: "Aba", image: bagImage, delivery: "Delivery by Friday", badge: "-19%" },
  { id: "office-satchel-bag", name: "Executive Office Satchel", category: "Fashion", price: 36800, rating: 4.6, reviews: 58, seller: "Ariaria Leather Works", city: "Aba", image: bagImage, delivery: "Delivery by Saturday" },
  { id: "ankara-two-piece", name: "Tailored Two-Piece Set", category: "Fashion", price: 24900, oldPrice: 29500, rating: 4.7, reviews: 76, seller: "Nwaanyị Styles", city: "Onitsha", image: bagImage, delivery: "Same-day delivery", badge: "-16%" },

  { id: "standing-fan-18", name: "18\" Rechargeable Standing Fan", category: "Home", price: 68500, oldPrice: 79000, rating: 4.7, reviews: 134, seller: "Owerri Home Centre", city: "Owerri", image: homeImage, delivery: "Delivery by Thursday", badge: "-13%" },
  { id: "kitchen-blender-pro", name: "Pro Kitchen Blender 600W", category: "Home", price: 42500, rating: 4.6, reviews: 91, seller: "Owerri Home Centre", city: "Owerri", image: homeImage, delivery: "Delivery tomorrow" },
  { id: "gas-cooker-4burner", name: "4-Burner Gas Cooker", category: "Home", price: 189000, oldPrice: 215000, rating: 4.5, reviews: 47, seller: "Abakaliki Home Store", city: "Abakaliki", image: homeImage, delivery: "Delivery by Monday", badge: "-12%" },
  { id: "bedside-lamp-set", name: "Warm Bedside Lamp Set", category: "Home", price: 16500, rating: 4.4, reviews: 33, seller: "Abakaliki Home Store", city: "Abakaliki", image: homeImage, delivery: "Delivery by Friday" },

  { id: "shea-body-butter", name: "Raw Shea Body Butter 500g", category: "Beauty", price: 8900, oldPrice: 10500, rating: 4.9, reviews: 187, seller: "Chidera Naturals", city: "Owerri", image: skincareImage, delivery: "Delivery by Friday", badge: "-15%" },
  { id: "hair-growth-oil", name: "Herbal Hair Growth Oil", category: "Beauty", price: 6500, rating: 4.7, reviews: 142, seller: "Chidera Naturals", city: "Owerri", image: skincareImage, delivery: "Delivery tomorrow" },

  { id: "infinix-hot-series", name: "Hot Series 128GB Smartphone", category: "Phones", price: 164000, oldPrice: 185000, rating: 4.5, reviews: 209, seller: "Kamsi Mobile Hub", city: "Awka", image: phoneImage, delivery: "Same-day delivery in Awka", badge: "-11%" },
  { id: "phone-charger-65w", name: "65W Fast Charger & Cable", category: "Phones", price: 12500, rating: 4.6, reviews: 167, seller: "Owerri Device Store", city: "Owerri", image: phoneImage, delivery: "Delivery by Thursday" },
];

export const categories = ["Phones", "Fashion", "Grocery", "Beauty", "Home", "Electronics"];
export const formatNaira = (value: number) => `₦${value.toLocaleString("en-NG")}`;
