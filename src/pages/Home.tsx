import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Languages, Sprout, ArrowRight, ShieldCheck, Leaf, Tractor, Activity } from "lucide-react";

const Home = () => {
    const navigate = useNavigate();
    const [language, setLanguage] = useState<"en" | "ml">("en");

    const toggleLanguage = () => {
        setLanguage(prev => prev === "en" ? "ml" : "en");
    };

    const t = (en: string, ml: string) => language === "en" ? en : ml;

    return (
        <div className={`min-h-screen bg-slate-50 font-sans ${language === "ml" ? "malayalam-text" : ""}`}>
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Leaf className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-xl font-black text-slate-800 tracking-tight hidden sm:block">Karshaka Mitram</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100/50 hover:bg-slate-100 rounded-full transition-all text-sm font-bold text-slate-600"
                        >
                            <Languages className="h-4 w-4 text-primary" />
                            {language === "en" ? "മലയാളം" : "English"}
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-primary/20"
                        >
                            {t("Login", "ലോഗിൻ")}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-slate-50 to-slate-50" />

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-in slide-in-from-left-6 duration-700 fade-in">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                            <Sprout className="h-4 w-4" />
                            {t("AI Powered Agriculture", "AI അധിഷ്ഠിത കൃഷി")}
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                            {t("Smart Farming for a", "മികച്ച ഭാവിക്കായി")} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">
                                {t("Better Future", "സ്മാർട്ട് കൃഷി")}
                            </span>
                        </h1>

                        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                            {t(
                                "Detect crop diseases instantly, get weather updates, and connect with buyers. All in one place.",
                                "വിള രോഗങ്ങൾ കണ്ടെത്തുക, കാലാവസ്ഥാ വിവരങ്ങൾ അറിയുക, വിപണി കണ്ടെത്തുക. എല്ലാം ഒരിടത്ത്."
                            )}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                onClick={() => navigate('/signup')}
                                className="h-14 px-8 rounded-2xl bg-primary text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/30"
                            >
                                {t("Get Started", "തുടങ്ങാം")}
                                <ArrowRight className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="h-14 px-8 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-lg flex items-center justify-center hover:bg-slate-50 transition-all hover:border-slate-300"
                            >
                                {t("Login Now", "ലോഗിൻ ചെയ്യൂ")}
                            </button>
                        </div>
                    </div>

                    <div className="relative animate-in slide-in-from-right-6 duration-1000 fade-in delay-200 hidden lg:block">
                        <div className="relative z-10 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-4 border border-slate-100 rotate-2 hover:rotate-0 transition-all duration-500">
                            <img
                                src="data:image/jpeg;base64,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"
                                alt="Farming"
                                className="rounded-[2rem] w-full h-[500px] object-cover shadow-inner"
                            />

                            {/* Floating Card 1 */}
                            <div className="absolute -left-12 top-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce duration-[3000ms]">
                                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <ShieldCheck className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
                                    <p className="text-lg font-black text-slate-900">Healthy Crop</p>
                                </div>
                            </div>

                            {/* Floating Card 2 */}
                            <div className="absolute -right-8 bottom-32 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-pulse duration-[4000ms]">
                                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Activity className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-400 uppercase">Analysis</p>
                                    <p className="text-lg font-black text-slate-900">AI Active</p>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-primary/20 blur-3xl -z-10 rounded-[4rem] translate-y-12 translate-x-12" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Features</span>
                        <h2 className="text-4xl font-black text-slate-900 mt-2 mb-4">{t("Everything you need", "കർഷകർക്ക് ആവശ്യമുള്ളതെല്ലാം")}</h2>
                        <p className="text-slate-500 text-lg">
                            {t("Advanced tools simplify farming for everyone.", "നൂതന സാങ്കേതികവിദ്യയിലൂടെ കൃഷി എളുപ്പമാക്കുന്നു.")}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Sprout className="h-8 w-8 text-white" />,
                                color: "bg-green-500",
                                title: t("Crop Diagnosis", "രോഗ നിർണയം"),
                                desc: t("Identify diseases instantly with our AI camera.", "AI ക്യാമറ ഉപയോഗിച്ച് രോഗങ്ങൾ കണ്ടെത്താം.")
                            },
                            {
                                icon: <Tractor className="h-8 w-8 text-white" />,
                                color: "bg-blue-500",
                                title: t("Marketplace", "വിപണി"),
                                desc: t("Sell your products directly to buyers.", "ഉൽപ്പന്നങ്ങൾ നേരിട്ട് വിൽക്കാം.")
                            },
                            {
                                icon: <Activity className="h-8 w-8 text-white" />,
                                color: "bg-orange-500",
                                title: t("Weather & Insights", "കാലാവസ്ഥ"),
                                desc: t("Get real-time weather alerts and farming tips.", "കാലാവസ്ഥാ മുന്നറിയിപ്പുകളും കൃഷി ഉപദേശങ്ങളും.")
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                                <div className={`h-16 w-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-${feature.color}/30`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
