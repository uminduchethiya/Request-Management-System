// AdminLayout.jsx


import Header from "./header"; // Assuming correct import path
import "./AdminLayout.css"; // Import your component-specific stylesheet

const AdminLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen w-full font-inter">
            <Header />
            <main className="flex-1 overflow-y-auto bg-gray-200 w-full">
                <div className="mt-20 border">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
