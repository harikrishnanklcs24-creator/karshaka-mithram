import { useAuth } from "@/context/AuthContext";
import { MapPin, Layers } from "lucide-react";

const SatelliteInsights = () => {
    const { userData } = useAuth();

    // Default to Thrissur
    const defaultLat = 10.5276;
    const defaultLng = 76.2144;

    const lat = userData?.location?.lat || defaultLat;
    const lng = userData?.location?.lng || defaultLng;

    // Calculate Bounding Box for the iframe
    // offset approx 0.05 degrees ~ 5km
    const offset = 0.05;
    const bbox = `${lng - offset},${lat - offset},${lng + offset},${lat + offset}`;

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Farm Location</h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-slate-200 shadow-sm">
                        <Layers className="h-4 w-4 text-slate-500" />
                        <span className="text-xs font-bold text-slate-600">Simple Map</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-2 border border-slate-100 shadow-sm overflow-hidden h-[300px] md:h-[450px] relative z-0">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`}
                    style={{ borderRadius: "2rem" }}
                    title="Farm Location Map"
                ></iframe>

                {!userData?.location && (
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg border border-slate-200 text-sm font-bold text-slate-600 pointer-events-none">
                        Default View (Thrissur) - Update Profile
                    </div>
                )}
            </div>
        </section>
    );
};

export default SatelliteInsights;
