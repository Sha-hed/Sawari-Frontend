/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCurrentUser } from "../../../redux/feature/auth/auth.slice";
import { useGetOrderQuery } from "../../../redux/feature/orders/orderApi";
import { useAppSelector } from "../../../redux/hooks";
import Admin from "../../../assets/images/Admin.png";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlineTableView } from "react-icons/md";
import { RiMotorbikeFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { CiViewTimeline } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { TUser } from "./user.types";
const UserDashboard = () => {
  const user: TUser | null = useAppSelector(getCurrentUser);

  const { isLoading } = useGetOrderQuery({ email: user?.email });

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row text-white">
      <div className="w-full flex flex-col md:flex-row md:block md:w-64 h-[290px] md:min-h-screen bg-[#00a2ed]">
        <div className="flex flex-col justify-center items-center mt-2 md:mt-10">
          <div className="w-20 rounded-full">
            <img className="rounded-full border-4 p-1" src={Admin} alt="" />
          </div>
          <h1 className="uppercase text-2xl font-semibold my-1">{`User Dashboard`}</h1>
          {/* <li className="list-none border py-1 px-2">
            <NavLink to={"/dashboard"}>Overview</NavLink>
          </li> */}
          <div className="w-full mx-auto my-3 border"></div>
        </div>
        <div>
          <div className="flex flex-row md:flex-col">
            <div className="flex items-center gap-2 m-3">
              <MdOutlineTableView className="text-xl" />
              <li className="list-none">
                <NavLink to="/UserDashboard/viewOrder">View Orders</NavLink>
              </li>
            </div>
            <div className="flex items-center gap-2 mx-3 mb-3">
              <RiLockPasswordLine className="text-xl" />
              <li className="list-none">
                <NavLink to="/UserDashboard/passwordChange">
                  Change Password
                </NavLink>
              </li>
            </div>
            {/* <div className="flex items-center gap-2 mx-3 mb-3">
                <RiMoneyDollarBoxFill className="text-xl" />
                <li className="list-none">
                  <NavLink to="/dashboard/bookedFlight">View Orders</NavLink>
                </li>
              </div>
              <div className="flex items-center gap-2 mx-3 mb-3">
                <FaUser className="text-xl" />
                <li className="list-none">
                  <NavLink to="/dashboard/addFlight">Manage Users</NavLink>
                </li>
              </div> */}
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

export default UserDashboard;
