import { NavLink, Outlet } from "react-router-dom";
// import Admin from '../assets/images/Admin.png';
import Admin from "../../../assets/images/Admin.png";
import { MdOutlineTableView } from "react-icons/md";
import { FaHome, FaUser } from "react-icons/fa";
import { RiMotorbikeFill } from "react-icons/ri";
import { CiViewTimeline } from "react-icons/ci";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
const DashboardLayout = () => {
  // const { data, isError, isLoading} = useGetOrderQuery({ email: user.email });
  // console.log('Ei Related Order gula paisos? ', data);

  return (
    <div className="w-full md:max-w-6xl mx-auto flex flex-col md:flex-row text-white">
      <div className="w-full md:w-64 flex flex-col md:flex-row md:block h-[300px] md:min-h-screen bg-[#00a2ed]">
        <div className="flex flex-col justify-center items-center mt-2 md:mt-10">
          <div className="w-20 rounded-full">
            <img className="rounded-full border-4 p-1" src={Admin} alt="" />
          </div>
          <h1 className="uppercase text-2xl font-semibold my-1">{`Admin Dashboard`}</h1>
          {/* <li className="list-none border py-1 px-2">
            <NavLink to={"/dashboard"}>Overview</NavLink>
          </li> */}
          <div className="w-full mx-auto my-3 border"></div>
        </div>
        <div>
          <div className="flex flex-row flex-wrap md:flex-col ">
            <div className="flex items-center gap-2 m-3">
              <MdOutlineTableView className="text-xl" />
              <li className="list-none">
                <NavLink to="/dashboard/manageBike">Manage Bike</NavLink>
              </li>
            </div>
            <div className="flex items-center gap-2 mx-3 mb-3">
              <RiMotorbikeFill className="text-xl" />
              <li className="list-none">
                <NavLink to="/dashboard/addBike">Add Bike</NavLink>
              </li>
            </div>
            <div className="flex items-center gap-2 mx-3 mb-3">
              <RiMoneyDollarBoxFill className="text-xl" />
              <li className="list-none">
                <NavLink to="/dashboard/manageOrder">View Orders</NavLink>
              </li>
            </div>
            <div className="flex items-center gap-2 mx-3 mb-3">
              <FaUser className="text-xl" />
              <li className="list-none">
                <NavLink to="/dashboard/manageUser">Manage Users</NavLink>
              </li>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto my-3 border divide-dotted"></div>
        <div className="flex flex-row md:flex-col justify-around">
          <div className="flex items-center gap-2 mx-3 mb-3">
            <FaHome className="text-xl" />
            <li className="list-none">
              <NavLink to="/">Home</NavLink>
            </li>
          </div>
          <div className="flex items-center gap-2 mx-3 mb-3">
            <RiMotorbikeFill className="text-xl" />
            <li className="list-none">
              <NavLink to="/bikes">Bikes</NavLink>
            </li>
          </div>
          <div className="flex items-center gap-2 mx-3 mb-3">
            <CiViewTimeline className="text-xl" />
            <li className="list-none">
              <NavLink to="/aboutUs">About Us</NavLink>
            </li>
          </div>
        </div>
      </div>
      <div className="flex-1 text-black">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
