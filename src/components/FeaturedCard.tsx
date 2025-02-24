/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";

const FeaturedCard = ({ bike } : any) => {
  return (
    <div className="w-[95%] md:w-96 my-3 bg-gray-100 p-5 rounded-md mx-auto">
      <div className="shadow relative">
        <img src={bike?.image} alt="" />
        <div
          className={`absolute top-5 right-0 w-[100px] ${
            bike.quantity > 0 ? "bg-green-400" : "bg-red-400"
          } h-[40px] flex justify-center items-center p-2 rounded-l-full`}
        >
          <h1 className={`font-semibold text-white `}>
            {bike.quantity >0  ? "Available" : "Stock Out"}
          </h1>
        </div>
      </div>
      <div className="my-5 space-y-2">
        <h1 className="font-semibold">{bike?.name}</h1>
        <h1>Brand : {bike?.brand}</h1>
        <h1>Model : {bike?.model}</h1>
        <h1 className="text-[#00a2ed] font-bold">TK. {bike?.price}</h1>
      </div>
      <div className="text-center">
        <Link
          state={{ id: bike._id }}
          to={"/bikeDetails"}
          className="px-6 py-2 bg-[#00a2ed] text-white rounded-2xl"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FeaturedCard;
