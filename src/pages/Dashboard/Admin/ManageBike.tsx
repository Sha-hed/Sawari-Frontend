/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteBikeMutation,
  useGetFeaturedBikesQuery,
} from "../../../redux/feature/bikes/bikeApi";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const ManageBike = () => {
  const {
    data: bikes,
    isLoading,
    refetch,
  } = useGetFeaturedBikesQuery({});
  const [deleteBike] = useDeleteBikeMutation();
  console.log("Bikes : ", bikes?.data);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-teal-600"></div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // write your code here

        const res = await deleteBike(id);
        console.log("Response :", res);
        if (res.data.status) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  return (
    <div>
      <h1 className="my-10 text-xl font-semibold text-center underline">
        Manage Bikes
      </h1>
      <div className="overflow-x-auto mx-3">
        <table className="w-full p-6 text-xs text-left md:whitespace-nowrap">
          <thead>
            <tr className="bg-gray-300 text-center text-black">
              {/* <th className="p-3">#</th> */}
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Model</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {bikes?.data?.map((bike:any, id: string) => (
              <tr className="border-2" key={id}>
                <td className="p-5 text-center border text-black font-medium">
                  {id + 1}
                </td>
                <td className="p-5 text-center border text-black font-medium">
                  {bike.name}
                </td>
                <td className="p-5 text-center border text-black font-medium">
                  {bike.brand}
                </td>
                <td className="p-5 text-center border text-black font-medium">
                  {bike.model}
                </td>
                <td className="p-5 text-center border text-black font-medium">
                  {bike.quantity}
                </td>
                <td className="p-5 text-center border text-black font-medium">
                  {bike.price}
                </td>
                <td className="flex justify-center items-center p-5 space-x-2">
                  <Link state={{id: bike._id}} to={`/dashboard/editBikes`}>
                    <FaEdit className="text-xl text-green-800" />
                  </Link>
                  <button onClick={() => handleDelete(bike._id)}>
                    <MdDeleteOutline className="text-xl text-red-800" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBike;
