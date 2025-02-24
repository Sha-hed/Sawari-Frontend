/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import {
  useGetAllUserQuery,
  useUpdateUserMutation,
} from "../../../redux/feature/auth/authApi";

const ManageUser = () => {
  const { data, refetch } = useGetAllUserQuery({});

  const [updateUser] = useUpdateUserMutation();
  console.log("User er data paiso ?", data?.data);

  const handleUpdateUser = async (id: string) => {
    //e.preventDefault();
    const res = await updateUser({ id }); // Pass id inside an object
    toast.success("User Updated Successfully!");
    console.log("Updated Info", res);
    refetch();
  };

  return (
    <div>
      <h1 className="text-center font-semibold my-10 text-xl underline">
        Manage User
      </h1>
      <div className="overflow-x-auto mx-3">
        <table className="w-full p-6 text-xs text-left whitespace-nowrap">
          <thead>
            <tr className="bg-gray-300 text-center text-black">
              {/* <th className="p-3">#</th> */}
              <th className="p-3">#</th>
              <th className="p-3">UserName</th>
              <th className="p-3">UserEmail</th>
              <th className="p-3">isBlocked</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="border-b bg-gray-50 border-gray-300 text-center">
            {data?.data?.slice(1, data?.data?.length).map((user:any, id:any) => (
              <tr className="border-2 py-3 space-y-2" key={id}>
                <td className="py-5">{id + 1}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{`${user?.isBlocked ? "Yes" : "No"}`}</td>
                <td>
                  <button
                    onClick={() => handleUpdateUser(user._id)}
                    className="bg-red-500 p-2 text-white font-semibold rounded-lg"
                  >
                    {` ${
                      user?.isBlocked === true ? "Unblock User" : "Block User"
                    }`}
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

export default ManageUser;
