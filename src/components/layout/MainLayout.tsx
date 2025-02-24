import { Outlet } from "react-router-dom";
import Navbar from "../../pages/Shared/Navbar";
import Footer from "../../pages/Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-200">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
