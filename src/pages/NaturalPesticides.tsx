import { useState } from "react";
import { ShoppingBag, Sprout, Star, Info, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const NaturalPesticides = () => {
    const { user } = useAuth();

    // Mock Data for Natural Pesticides
    const [products] = useState([
        {
            id: 1,
            name: "100% Pure Neem Oil",
            company: "Neem Company",
            price: 60,
            image: "/neem-oil.jpg",
            rating: 4.8,
            reviews: 124,
            description: "Cold-pressed, organic neem oil. Effective against aphids, whiteflies, and fungal diseases. Safe for beneficial insects.",
            benefits: ["Organic", "Eco-friendly", "Safe for bees"]
        },
        {
            id: 2,
            name: "Garlic & Chilli Spray",
            company: "Green Guard",
            price: 45,
            image: "https://images.unsplash.com/photo-1615485925694-a035aa0042dd?auto=format&fit=crop&q=80&w=300",
            rating: 4.5,
            reviews: 89,
            description: "Natural repellent for caterpillars and beetles. Made from fresh garlic and spicy chillies.",
            benefits: ["Homemade recipe", "Biodegradable", "Low cost"]
        },
        {
            id: 3,
            name: "Jeevamrutham",
            company: "Organic Soul",
            price: 150,
            image: "/jeevamrutham.png",
            rating: 4.9,
            reviews: 210,
            description: "Traditional liquid microbial fertilizer. Boosts soil health and enhances plant immunity against diseases.",
            benefits: ["Soil Booster", "Growth Promoter", "Traditional"]
        },
        {
            id: 4,
            name: "Trichoderma Viride",
            company: "BioDefense",
            price: 90,
            image: "/trichoderma.png",
            rating: 4.7,
            reviews: 156,
            description: "Bio-fungicide powder. Controls root rot, wilt, and damping off. promoting healthy root growth.",
            benefits: ["Fungicide", "Root Health", "Bio-Control"]
        }
    ]);

    const handleBuy = (productName: string) => {
        toast.success(`Order placed for ${productName}!`, {
            description: "The seller will contact you shortly."
        });
    };

    return (
        <div className="min-h-screen pb-20 animate-fade-in">
            <header className="bg-gradient-to-r from-green-800 to-green-600 text-white p-8 rounded-b-[3rem] shadow-lg mb-8 relative overflow-hidden">
                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/20 backdrop-blur rounded-xl">
                            <Sprout className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold tracking-wider text-green-100 uppercase text-xs">Eco-Store</span>
                    </div>
                    <h1 className="text-3xl font-black mb-2">Natural Pesticides</h1>
                    <p className="text-green-100 max-w-xl">
                        Protect your crops effectively without harming current environment. Certified organic solutions for sustainable farming.
                    </p>
                </div>
                {/* Decoration */}
                <Sprout className="absolute -bottom-8 -right-8 h-48 w-48 text-white opacity-10 rotate-12" />
            </header>

            <main className="max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-xl hover:border-green-200 transition-all duration-300 animate-slide-up hover:-translate-y-1"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                    <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">{product.company}</p>
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">{product.name}</h3>
                                    <p className="text-sm text-slate-500 line-clamp-2">{product.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {product.benefits.map((benefit, i) => (
                                        <span key={i} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-1 rounded-lg font-medium">
                                            {benefit}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <p className="text-xs text-slate-400">Price</p>
                                        <p className="text-2xl font-black text-slate-900">₹{product.price}</p>
                                    </div>
                                    <button
                                        onClick={() => handleBuy(product.name)}
                                        className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 active:scale-95 transition-all shadow-md hover:shadow-green-200 flex items-center gap-2"
                                    >
                                        <ShoppingBag className="h-4 w-4" />
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default NaturalPesticides;
