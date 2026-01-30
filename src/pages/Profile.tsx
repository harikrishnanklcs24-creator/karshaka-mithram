import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { User, Phone, MapPin, ArrowLeft, Save, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
    const { user, userData, refreshUserData } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        district: "",
        location: null as { lat: number; lng: number } | null
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || "",
                phone: userData.phone || "",
                address: userData.address || "",
                district: userData.district || "",
                location: userData.location || null
            });
        }
    }, [userData]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            await updateDoc(doc(db, "users", user.uid), {
                ...formData,
                updatedAt: new Date().toISOString()
            });
            await refreshUserData();
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    const updateLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported");
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setFormData({
                    ...formData,
                    location: { lat: pos.coords.latitude, lng: pos.coords.longitude }
                });
                toast.success("Location updated!");
                setLoading(false);
            },
            () => {
                toast.error("Failed to get location");
                setLoading(false);
            }
        );
    };

    return (
        <div className="min-h-screen">
            <main className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm space-y-8">
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    required
                                    className="farmer-input pl-12 h-14"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    required
                                    className="farmer-input pl-12 h-14"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Full Address</label>
                            <textarea
                                required
                                rows={3}
                                className="farmer-input resize-none p-4"
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">GPS Location</label>
                            <button
                                type="button"
                                onClick={updateLocation}
                                className={`w-full h-14 rounded-2xl border-2 border-dashed flex items-center justify-center gap-2 transition-all ${formData.location ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 text-slate-400'
                                    }`}
                            >
                                <MapPin className="h-5 w-5" />
                                {formData.location ? `Coordinates: ${formData.location.lat.toFixed(4)}, ${formData.location.lng.toFixed(4)}` : "Update Location"}
                            </button>
                        </div>

                        <button
                            disabled={loading}
                            className="farmer-btn w-full h-14 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save className="h-5 w-5" /> Save Profile</>}
                        </button>
                    </form>

                    <div className="pt-8 border-t border-slate-100">
                        <button
                            onClick={() => navigate("/login")} // In real app, call logout
                            className="w-full h-14 rounded-2xl border-2 border-red-100 text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out Account
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
