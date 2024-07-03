// AdminLayout.jsx

import Header from "./header";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-200">
            <div className="container mx-auto px-4 py-6 mt-24">
              {children}
            </div>
          </main>
        </div>
      );
    };

export default AdminLayout;
