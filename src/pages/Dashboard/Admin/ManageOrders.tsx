/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetAllOrderQuery,
  useUpdateStatusMutation,
} from "../../../redux/feature/orders/orderApi";

const ManageOrders = () => {


  const [status, setStatus] = useState("Pending");

  const { data, isLoading, refetch } = useGetAllOrderQuery(undefined);
  const [updateStatus] = useUpdateStatusMutation();
  console.log("Data Retrieved Successfully", data?.data);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-teal-600"></div>
      </div>
    );
  }

  const handleUpdate = async (id:string) => {
    const updatedInfo = await updateStatus({ id, status });
    refetch();
    console.log("UPdated info ", updatedInfo);
  };

  return (
    <div>
      <h1 className="uppercase font-semibold text-xl text-center my-10 underline">
        All Orders
      </h1>
      <div className="overflow-x-auto mx-3">
        <table className="w-full p-6 text-xs text-left whitespace-nowrap">
          <thead>
            <tr className="bg-gray-300 text-center text-black">
              <th className="p-3">No.</th>
              <th className="p-3">UserEmail</th>
              <th className="p-3">Order Id</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">TotalPrice</th>
              {/* <th className="p-3">Model</th> */}
              <th className="p-3">Status</th>
              <th className="p-3">ChangeStatus</th>
            </tr>
          </thead>
          <tbody className="border-b bg-gray-50 border-gray-300 text-center">
            {data?.data?.map((bike:any, id:string) => (
              <tr className="border-2 py-1 space-y-2" key={id}>
                <td>{id + 1}</td>
                <td>{bike?.email}</td>
                <td>{bike?.transaction?.order_id}</td>
                <td>{bike?.quantity}</td>
                <td>{bike?.totalPrice}</td>
                {/* <td>{bike?.product?.model}</td> */}
                <td
                  className={`px-2 ${
                    bike?.transaction.bank_status === "Success"
                      ? "bg-green-600 p-2 font-semibold text-white"
                      : bike?.transaction.bank_status === "Failed"
                      ? "bg-red-600 p-2 font-semibold text-white"
                      : "bg-yellow-600 p-2 font-semibold text-white"
                  }`}
                >
                  {bike?.transaction.bank_status}
                </td>
                <td className="border outline-none w-[100px]">
                  <form></form>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)} // Updates the state
                    className="p-2"
                    id=""
                  >
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Success">Success</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleUpdate(bike._id)}
                    className="px-2 py-2 bg-[#00a2ed] text-white"
                  >
                    Confirm
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

export default ManageOrders;
