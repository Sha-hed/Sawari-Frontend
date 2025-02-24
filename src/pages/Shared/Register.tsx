import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/feature/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/auth.slice";

// enum GenderEnum {
//   female = "female",
//   male = "male",
//   other = "other",
// }

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const dispatch = useAppDispatch();
  const [Register] = useRegisterMutation();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const registerInfo = await Register(data).unwrap();
    console.log("Register Check ", registerInfo);
    const user = await verifyToken(registerInfo.data.accessToken);
    dispatch(setUser({ user, token: registerInfo.data.accessToken }));
    toast.success("User Registered Successfully!");
    navigate("/");
  };
  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="bg-white py-10 border rounded-xl shadow">
        <div className="w-full md:w-[500px] mx-auto p-5">
          <h1 className="text-3xl font-bold">Register</h1>
          <hr className="w-[90%] md:w-[400px] my-10" />
          <div className="">
            <form
              className="flex flex-col space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                className="w-[90%] md:w-[400px] p-3 border border-blue-100 rounded-full outline-none"
                placeholder="Name"
              />
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                className="w-[90%] md:w-[400px] p-3 border border-blue-100 rounded-full outline-none"
                placeholder="Email"
              />
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password Is required",
                  },
                })}
                className="w-[90%] md:w-[400px] p-3 border border-blue-100 rounded-full outline-none"
                placeholder="Password"
              />
              <input
                className="w-[90%] md:w-[400px] rounded-full p-3 text-white bg-[#00a2ed] cursor-pointer"
                type="submit"
                value="Register"
              />
            </form>
          </div>
          <hr className="w-[90%] md:w-[400px] my-10" />
          <h1 className=" text-center">
            Already have account ?{" "}
            <Link to={"/login"} className="text-[#00a2ed]">
              Login
            </Link>{" "}
            Here
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Register;
