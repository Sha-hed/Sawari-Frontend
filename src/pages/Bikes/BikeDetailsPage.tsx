import { Link, useLocation } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/feature/bikes/bikeApi";
import info from "../../assets/images/info.svg";
import toast from "react-hot-toast";

const BikeDetailsPage = () => {
  const location = useLocation();
  const id = location?.state?.id;

  // ✅ Directly pass `id` to the RTK Query hook
  const { data: bike, error, isLoading } = useGetSingleBikeQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching bike details!</p>;

  console.log("Bike details:", bike);

  const handleNotAvailable = () =>{
    return toast.error('Sorry, Bike is currently Unavailable')
  }

  return (
    <div className="py-12">
      {bike && (
        <>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 border-y bg-white p-8">
            <div className="w-full md:w-[45%]">
              <img src={bike.data.image} alt="" />
            </div>
            <div className="w-full md:w-[50%] flex flex-col space-y-5 pt-5">
              <h1 className="text-3xl font-semibold">{bike.data.name}</h1>
              <h1 className="text-4xl text-[#00a2ed] font-bold">
                BDT. {bike.data.price}
              </h1>
              <h1>Brand : {bike.data.brand}</h1>
              <h1>Model : {bike.data.model}</h1>
              <div className="flex justify-center pt-5">
                {
                  bike?.data?.quantity>0 ? ( <Link
                    to={"/checkOut"}
                    state={{ id: bike.data._id }}
                    className="w-1/2 font-semibold text-center px-6 py-2 bg-[#00a2ed] text-white rounded-2xl"
                  >
                    Order Now
                  </Link>):( <button onClick={handleNotAvailable}
                  className="w-1/2 font-semibold text-center px-6 py-2 bg-red-400 text-white rounded-2xl"
                >
                  Stock Out
                </button>)
                }
              </div>
            </div>
          </div>
          <div className="max-w-7xl mt-10  mx-auto flex flex-col items-center gap-5 border-y bg-white px-2 md:px-8 py-8">
            <div className="flex flex-col items-center">
              <div className="w-10">
                <img src={info} alt="" />
              </div>
              <p className="text-[#00a2ed] uppercase font-medium">
                Description
              </p>
            </div>
            <p>{bike.data.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BikeDetailsPage;
