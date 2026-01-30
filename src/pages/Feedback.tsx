import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { MessageSquare, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
    const { user, userData } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({
        subject: "",
        message: "",
        type: "general"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!feedback.subject.trim() || !feedback.message.trim()) {
            toast.error("Please fill in all fields");
            return;
        }

        if (!user) {
            toast.error("You must be logged in to send feedback");
            return;
        }

        setLoading(true);

        try {
            await addDoc(collection(db, "feedback"), {
                userId: user.uid,
                userName: userData?.name || "Anonymous",
                userEmail: user.email,
                subject: feedback.subject,
                message: feedback.message,
                type: feedback.type,
                status: "unread",
                createdAt: new Date().toISOString()
            });

            toast.success("Feedback sent successfully! Thank you.");
            setFeedback({ subject: "", message: "", type: "general" });

            // Optional: Navigate back to dashboard after delay
            setTimeout(() => navigate("/dashboard"), 2000);

        } catch (error) {
            console.error("Error sending feedback:", error);
            toast.error("Failed to send feedback. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-20">
            <main className="max-w-3xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <MessageSquare className="h-8 w-8 text-primary" />
                        Feedback & Support
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium text-lg">
                        We value your input! Share your thoughts or report issues to help us improve.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Feedback Type</label>
                            <div className="grid grid-cols-3 gap-4">
                                {['general', 'bug', 'feature'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFeedback({ ...feedback, type })}
                                        className={`h-12 rounded-xl font-bold text-sm capitalize transition-all duration-200 border-2 ${feedback.type === type
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-slate-100 text-slate-500 hover:border-slate-200'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                            <input
                                required
                                value={feedback.subject}
                                onChange={(e) => setFeedback({ ...feedback, subject: e.target.value })}
                                className="w-full h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/20 px-4 font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400"
                                placeholder="What is this about?"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                            <textarea
                                required
                                rows={6}
                                value={feedback.message}
                                onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                                className="w-full rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-primary/20 p-4 font-medium text-slate-900 outline-none transition-all resize-none placeholder:text-slate-400"
                                placeholder="Tell us more details..."
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    <>
                                        <span>Send Feedback</span>
                                        <Send className="h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Feedback;
