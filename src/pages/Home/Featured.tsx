/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import FeaturedCard from "../../components/FeaturedCard";
import { useGetFeaturedBikesQuery } from "../../redux/feature/bikes/bikeApi";

const Featured = () => {
  // const { data, isError, isLoading } = useGetAllBikesQuery({});
  // console.log("Featured Bike Gula Paiso ", data?.data?.bikes);

  const { data: bike, isLoading } = useGetFeaturedBikesQuery(undefined);
  console.log("Featured Bike Gula paiso ?", bike);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full md:max-w-7xl mx-auto">
      <h1 className="font-bold text-3xl mt-20 mb-5 text-center md:text-left">
        Featured Bike
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
        {bike?.data?.slice(0, 6).map((bike:any, id:any) => (
          <FeaturedCard key={id} bike={bike} />
        ))}
      </div>
      <div className="flex justify-center items-center py-5">
        <Link
          to={"/bikes"}
          className="px-6 py-2 bg-[#00a2ed] text-white rounded-2xl"
        >
          View All Bikes
        </Link>
      </div>
    </div>
  );
};

export default Featured;
