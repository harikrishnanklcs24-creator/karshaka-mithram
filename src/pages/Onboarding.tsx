import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { Languages, MapPin, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const KERALA_DISTRICTS = [
    "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam",
    "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram",
    "Kozhikode", "Wayanad", "Kannur", "Kasaragod"
];

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [language, setLanguage] = useState<"en" | "ml" | "">("");
    const [district, setDistrict] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [loading, setLoading] = useState(false);

    const { user, refreshUserData } = useAuth();
    const navigate = useNavigate();

    const getLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                toast.success("Location synchronized!");
                setLoading(false);
            },
            (error) => {
                console.error("Location error:", error);
                toast.error("Failed to get location. Please enter address manually.");
                setLoading(false);
            }
        );
    };

    const handleComplete = async () => {
        if (!user) {
            console.error("No user found in Onboarding");
            return;
        }
        setLoading(true);
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                language,
                district,
                name,
                phone,
                address,
                location: coords,
                isOnboarded: true,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            await refreshUserData();
            toast.success("Profile setup complete!");
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Onboarding completion error:", error);
            toast.error(`Error: ${error.message || "Failed to save preferences"}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-500">
                <div className="h-1.5 w-full bg-slate-100">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                <div className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                            <div className="text-center">
                                <div className="mx-auto h-16 w-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                                    <Languages className="h-8 w-8 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Choose Language</h2>
                                <p className="text-slate-500 mt-2">Preferred language for communication</p>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mt-8">
                                <button
                                    onClick={() => setLanguage("en")}
                                    className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${language === "en" ? "border-primary bg-primary/5 shadow-md" : "border-slate-100 hover:border-slate-200"}`}
                                >
                                    <div className="text-left">
                                        <p className="font-bold text-lg text-slate-800">English</p>
                                        <p className="text-sm text-slate-500">Default application language</p>
                                    </div>
                                    {language === "en" && <CheckCircle2 className="h-6 w-6 text-primary" />}
                                </button>
                                <button
                                    onClick={() => setLanguage("ml")}
                                    className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${language === "ml" ? "border-primary bg-primary/5 shadow-md" : "border-slate-100 hover:border-slate-200"}`}
                                >
                                    <div className="text-left">
                                        <p className="font-bold text-lg text-slate-800">മലയാളം</p>
                                        <p className="text-sm text-slate-500">മാതൃഭാഷയിൽ ഉപയോഗിക്കാൻ</p>
                                    </div>
                                    {language === "ml" && <CheckCircle2 className="h-6 w-6 text-primary" />}
                                </button>
                            </div>

                            <button
                                disabled={!language}
                                onClick={() => setStep(2)}
                                className="farmer-btn w-full mt-8 flex items-center justify-center gap-2 group"
                            >
                                <span>Continue</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                            <div className="text-center">
                                <div className="mx-auto h-16 w-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-4">
                                    <MapPin className="h-8 w-8 text-orange-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Your District</h2>
                                <p className="text-slate-500 mt-2">Select your district in Kerala</p>
                            </div>

                            <div className="mt-8">
                                <select
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    className="farmer-select h-14"
                                >
                                    <option value="">Select District</option>
                                    {KERALA_DISTRICTS.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button onClick={() => setStep(1)} className="flex-1 px-6 py-3 border-2 border-slate-100 rounded-xl font-semibold text-slate-600 hover:bg-slate-50">Back</button>
                                <button disabled={!district} onClick={() => setStep(3)} className="flex-[2] farmer-btn flex items-center justify-center gap-2">
                                    <span>Continue</span>
                                    <ArrowRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-8 duration-500">
                            <div className="text-center">
                                <div className="mx-auto h-16 w-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                                    <CheckCircle2 className="h-8 w-8 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Detailed Profile</h2>
                                <p className="text-slate-500 mt-2">Let's finish your details</p>
                            </div>

                            <div className="space-y-4">
                                <input
                                    className="farmer-input"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                <input
                                    className="farmer-input"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                                <textarea
                                    className="farmer-input min-h-[100px]"
                                    placeholder="Full Address"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={getLocation}
                                    className={`w-full py-3 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 transition-all ${coords ? 'bg-green-50 border-primary text-primary' : 'border-slate-200 text-slate-500'}`}
                                >
                                    <MapPin className="h-5 w-5" />
                                    {coords ? `Attached: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "Attach GPS Location"}
                                </button>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button onClick={() => setStep(2)} className="flex-1 px-6 py-3 border-2 border-slate-100 rounded-xl font-semibold text-slate-600 hover:bg-slate-50">Back</button>
                                <button disabled={!name || !phone || loading} onClick={handleComplete} className="flex-[2] farmer-btn flex items-center justify-center gap-2">
                                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><span>Finish</span><CheckCircle2 className="h-5 w-5" /></>}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
