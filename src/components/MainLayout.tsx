import Sidebar from "./Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Sidebar />
            <div className="lg:pl-72 min-h-screen">
                <main className="pt-16 lg:pt-0">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
