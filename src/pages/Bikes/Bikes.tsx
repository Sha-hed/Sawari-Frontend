/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import FeaturedCard from "../../components/FeaturedCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
//import { FiSearch } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const Bikes = () => {
  const location = useLocation();
  console.log("Location", location);
  const [search, setSearch] = useState(location?.state?.search || "");

  const [firstPage, setFirstPage] = useState(0);
  const [docCount, setDocCount] = useState(1);
  // const [model, setModel] = useState("");
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (location?.state?.search) {
      setSearch(location.state.search);
    }
  }, [location?.state?.search]);

  const {
    data: bikes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bikes", firstPage, search],
    queryFn: async () => {
      const response = await fetch(
        `https://bike-store-backend-sand.vercel.app/api/v1/bikes?search=${search}&category=${category}&brand=${brand}&minimum=${minimum}&maximum=${maximum}&firstPage=${firstPage}`
      );
      const data = await response.json();
      setDocCount(Number(await data.data.totalFilteredBikes));
      return data.data.bikes;
    },
  });

  // const { data, isError, isLoading, refetch } = useGetAllBikesQuery(
  //   { model, category, brand, minimum, maximum, firstPage },
  //   { refetchOnMountOrArgChange: true }
  // );

  // useEffect(() => {
  //   // This effect ensures that the query is refetched on page load or when the filters change
  //   refetch();
  // }, [model, minimum, maximum, brand, category, firstPage, refetch]);

  // const bikes = data?.data.bikes;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-teal-600"></div>
      </div>
    );
  }

  const handleGetAllValues = () => {
    console.log("Category:", category);
    console.log("Brand:", brand);
    console.log("Minimum:", minimum);
    console.log("Maximum:", maximum);
    console.log("First Page:", firstPage);
    setSearch("");
    refetch();
  };

  // For Pagination Concept
  const totalDoc = docCount;
  const n = Math.ceil(totalDoc / 3);
  const pages = [...Array(n).keys()];

  const handlePrev = () => {
    if (firstPage > 0) {
      setFirstPage(firstPage - 1);
    }
  };
  const handleNext = () => {
    if (pages.length - 1 > firstPage) {
      setFirstPage(firstPage + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-5">
      <div className="h-auto md:h-[120px] p-5 bg-white flex flex-col md:flex-row justify-between rounded-xl gap-y-2 md:gap-y-0">
        {/* <div className="flex flex-col items-center gap-1">
          <label className="font-medium">Model</label>
          <input
            value={model}
            onChange={(e) => setModel(e.target.value)}
            type="text"
            placeholder="Search by Model"
            className="p-2 w-[200px] outline-none border rounded-xl"
          />
        </div> */}

        <div className="flex flex-col items-center gap-1">
          <label className="font-medium">Brand</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="p-2 w-[200px] outline-none border rounded-xl"
          >
            <option value="">Select a brand</option>
            <option value="Yamaha">Yamaha</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Honda">Honda</option>
            <option value="Hero">Hero</option>
            <option value="Royal_Enfield">Royal Enfield</option>
          </select>
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="font-medium">Price Range</label>
          <div className="flex items-center gap-2">
            <input
              value={minimum}
              onChange={(e) => setMinimum(e.target.value)}
              type="text"
              placeholder="Minimum tk"
              className="p-2 w-[120px] md:w-[200px] outline-none border rounded-xl"
            />
            <label className="font-medium">To</label>
            <input
              value={maximum}
              onChange={(e) => setMaximum(e.target.value)}
              type="text"
              placeholder="Maximum tk"
              className="p-2 w-[120px] md:w-[200px] outline-none border rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 w-[200px] outline-none border rounded-xl"
          >
            <option value="">Select a category</option>
            <option value="Standard">Standard</option>
            <option value="SportBike">SportBike</option>
            <option value="Scooter">Scooter</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <button
          onClick={handleGetAllValues}
          className="px-6 py-2 bg-[#00a2ed] text-white rounded-2xl font-semibold"
        >
          Filter Search
        </button>
      </div>
      <div>
        {bikes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {bikes?.map((bike: any, id: any) => {
              return <FeaturedCard key={id} bike={bike} />;
            })}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center mt-20">
            <h1 className="font-bold text-xl text-red-600">No Bikes Found</h1>
          </div>
        )}
      </div>
      <div>
        {bikes?.length > 0 && (
          <div className="flex justify-center my-10 pb-5">
            <button onClick={handlePrev} className="py-3 px-4 border">
              <MdKeyboardArrowLeft className="" />
            </button>
            {pages?.map((page, index) => (
              <button
                onClick={() => setFirstPage(page)}
                key={index}
                className={`py-3 px-5 border font-semibold ${
                  page === firstPage ? "text-blue-600 bg-gray-100" : ""
                }`}
              >
                {page}
              </button>
            ))}
            <button onClick={handleNext} className="py-3 px-4 border">
              <MdKeyboardArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bikes;
