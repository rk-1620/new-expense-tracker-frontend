import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between bg-white border-b border-gray-200/50 backdrop-blur-sm py-4 px-6 sticky top-0 z-40">
        {/* Always-visible Menu Toggle Button */}
        <button
          className="text-gray-800 focus:outline-none"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        {/* Centered Title (visually centered when side button is visible) */}
        <h2 className="text-lg font-semibold text-gray-800 mx-auto">
          Expense Tracker
        </h2>

        {/* Spacer to balance layout (same width as button) */}
        <div className="w-6" />
      </div>

      {/* Slide-in SideMenu */}
      {openSideMenu && (
        <div className="fixed top-[64px] left-0 w-64 h-full bg-white shadow-lg z-30 border-r border-gray-200 transition-transform">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </>
  );
};

export default Navbar;
