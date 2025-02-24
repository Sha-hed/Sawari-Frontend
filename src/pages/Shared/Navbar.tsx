import logo from "../../assets/images/Logo2.png";
import { FiSearch } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getCurrentUser, logout } from "../../redux/feature/auth/auth.slice";
import { useState } from "react";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";

const navItems = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/bikes",
    title: "Bikes",
  },
  {
    path: "/aboutUs",
    title: "AboutUs",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(getCurrentUser);

  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  // const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();

  const handleSearch = () => {
    // console.log('Search :', searchText);
    setIsOpen(false);
    navigate("/bikes", { state: { search: searchText } }); 
    // console.log('Search Text : ', searchText);// Corrected state object
  };

  const handleLogOut = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="w-full h-[80px] md:h-[140px] shadow border border-b-1">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-40">
              <img src={logo} alt="" />
            </div>
            <div className="hidden md:flex items-center ">
              <input
                // ref={searchRef}
                onChange={(e) =>setSearchText(e.target.value)}
                className="placeholder-gray-600 placeholder:text-sm outline-none py-2 px-6 border border-gray-400 rounded-3xl rounded-r-none border-r-0"
                type="text"
                name="searchText"
                id=""
                placeholder="Search Bike Here..."
              />
              <button
                onClick={handleSearch}
                className="bg-[#00a2ed] py-[10.7px] px-5 font-bold text-xl text-white rounded-r-3xl"
              >
                <FiSearch />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex space-x-5">
              {user && (
                <Link
                  to={"/face"}
                  className="px-6 py-2 bg-[#00a2ed] text-white rounded-2xl"
                >
                  Dashboard
                </Link>
              )}
            </div>
            {/* Login LogOut Myth */}
            <div>
              <div className="hidden md:flex">
                {user ? (
                  <button
                    onClick={() => dispatch(logout())}
                    className="px-6 py-2 bg-[#00a2ed] text-white rounded-2xl"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={"/login"}
                    className="px-6 py-2 bg-[#00a2ed] text-white rounded-2xl"
                  >
                    Login
                  </Link>
                )}
              </div>
              <button className="md:hidden">
                <MdOutlineMenuOpen
                  onClick={() => setIsOpen(true)}
                  className="text-3xl text-blue-600 mr-1"
                />
              </button>
            </div>
          </div>
        </div>
        <hr className="hidden md:flex" />
        <div className="hidden md:flex justify-center items-center space-x-10 mt-4">
          {navItems?.map((item, idx) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-[#00a2ed] font-bold " : "text-gray-600"
              }
              to={item.path}
              key={idx}
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
      {/* Sidebar Menu */}
      <div
        className={`fixed z-10 top-0 left-0 h-full w-full bg-white transition-transform transform duration-500 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="w-40">
            <img src={logo} alt="" />
          </div>
          <button onClick={() => setIsOpen(false)}>
            <a href="">
              <IoCloseCircleOutline className="text-3xl text-blue-600 mr-1 font-semibold" />
            </a>
          </button>
        </div>
        <hr />
        <div className="flex items-center my-5 mx-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            className="placeholder-gray-600 placeholder:text-sm outline-none py-2 px-6 border border-gray-400 rounded-3xl rounded-r-none border-r-0"
            type="text"
            name="searchText"
            id=""
            placeholder="Search Bike Here..."
          />
          <button
            onClick={handleSearch}
            className="bg-[#00a2ed] py-[10.7px] px-5 font-bold text-xl text-white rounded-r-3xl"
          >
            <FiSearch />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-6 text-lg mt-10">
          <li>
            <Link
              to={"/"}
              className="hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/bikes"}
              className="hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              Bikes
            </Link>
          </li>
          <li>
            <Link
              to={"/aboutUs"}
              className="hover:text-gray-400"
              onClick={() => setIsOpen(false)}
            >
              AboutUs
            </Link>
          </li>
          <li>
            {user && (
              <Link to={"/face"} onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
            )}
          </li>
          <li>
            {user ? (
              <button onClick={handleLogOut}>Logout</button>
            ) : (
              <Link to={"/login"} onClick={() => setIsOpen(false)}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
