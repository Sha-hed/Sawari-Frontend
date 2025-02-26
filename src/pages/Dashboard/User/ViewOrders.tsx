/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentUser } from "../../../redux/feature/auth/auth.slice";
import { useGetOrderQuery } from "../../../redux/feature/orders/orderApi";
import { useAppSelector } from "../../../redux/hooks";
import { TUser } from "./user.types";

const ViewOrders = () => {
  const user: TUser | null = useAppSelector(getCurrentUser);
  //const owner = user?.role;

  const { data, isLoading } = useGetOrderQuery({ email: user!.email }); 

  console.log(data.data);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-teal-600"></div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="uppercase text-lg text-center font-bold my-10 underline">
        View Orders
      </h1>
      <div>
        {data?.data?.length > 0 ? (
          <div className="overflow-x-auto mb-5">
            <table className="w-full p-6 text-xs text-left whitespace-nowrap">
              <thead>
                <tr className="bg-gray-300 text-center text-black">
                  <th className="p-3">#</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Order Id</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="border-b bg-gray-50 border-gray-300 text-center">
                {data?.data?.map((bike: any, id: any) => (
                  <tr className="border-2 py-1" key={id}>
                    <td>{id + 1}</td>
                    <td>{bike.name}</td>
                    <td>{bike.transaction.order_id}</td>
                    <td>{bike.totalPrice}</td>
                    <td
                      className={`${
                        bike.transaction.bank_status === "Success"
                          ? "bg-green-600 p-2 font-semibold text-white"
                          : bike.transaction.bank_status === "Failed"
                          ? "bg-red-600 p-2 font-semibold text-white"
                          : "bg-yellow-600 p-2 font-semibold text-white"
                      }`}
                    >
                      {bike.transaction.bank_status}
                    </td>
                  </tr>
                ))}
                {/* <tr className="border font-semibold text-black">
                  <td>{id + 1}</td>
                  <td>{project.title}</td>
                  <td className="flex justify-center">
                    <Image src={project.image} alt="" width={100} height={100} />
                  </td>
                  <td>
                    <a
                      className="hover:underline"
                      href={project.liveLink}
                      target="_blank"
                    >
                      Click Here
                    </a>
                  </td>
                  <td>
                    <HandleEditDeleteProject projectId={project._id} />
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="h-screen flex justify-center ">
            <h1 className="text-red-400 font-bold text-xl text-center my-5">You haven’t placed any orders yet.</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
