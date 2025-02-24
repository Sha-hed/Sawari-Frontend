/* eslint-disable @typescript-eslint/no-explicit-any */

import { getCurrentUser } from "../../../redux/feature/auth/auth.slice";
import { useChangePassMutation } from "../../../redux/feature/auth/authApi";
import { useAppSelector } from "../../../redux/hooks";
import toast from "react-hot-toast";
import { TUser } from "./user.types";

const PasswordChange = () => {

  const user : TUser | null = useAppSelector(getCurrentUser);
  const [ passwordChange] = useChangePassMutation()

  const handleSubmit =async (e:any) =>{
    e.preventDefault();
    const email = user!.email
    const oldPassword = e.target.oldPass.value;
    const newPassword = e.target.newPass.value;

    const password ={
        email,
        oldPassword,
        newPassword
    }

    const res = await passwordChange(password);
    console.log('Password Change er result kor ', res.data.data.success);
    if(!res?.data?.data?.success){
       toast.error(res.data.data.message)
    }else{
        toast.success(res.data.data.message)
    }
    e.target.reset()
  }

  return (
    <div>
      <h1 className="text-center font-semibold text-xl my-10 underline">
        Change Password
      </h1>
      <div className="mb-5">
        <form onSubmit={handleSubmit} className="w-[90%] md:w-[500px] mx-auto flex flex-col space-y-3 bg-gray-200 p-5 rounded-xl" action="">
          <label className="font-semibold" htmlFor="">Name</label>
          <input className="p-2 outline-none rounded-xl" defaultValue={user?.name} type="text" name="" id="" />
          <label className="font-semibold"  htmlFor="">Email</label>
          <input className="p-2 outline-none rounded-xl" defaultValue={user?.email} type="text" name="" id="" />
          <label className="font-semibold"  htmlFor="">Old Password</label>
          <input className="p-2 outline-none rounded-xl" placeholder="Enter Old Password" type="password" name="oldPass" id="" />
          <label className="font-semibold"  htmlFor="">New Password</label>
          <input className="p-2 outline-none rounded-xl" placeholder="Enter New Password" type="password" name="newPass" id="" />
          <button type="submit" className="px-6 py-2 bg-[#00a2ed] text-white rounded-2xl">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
