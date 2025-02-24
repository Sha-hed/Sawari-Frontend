/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/auth.slice";
import { verifyToken } from "../../utils/verifyToken";
import toast from "react-hot-toast";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { data, error }] = useLoginMutation(undefined);

  console.log("Data => ", data);
  console.log("Error => ", error);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log(res);
      const user = await verifyToken(res.data.accessToken);
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="w-full md:max-w-7xl mx-auto py-10 ">
      <div className="bg-white py-10 border rounded-xl shadow">
        <div className="w-[90%] md:w-[500px] mx-auto p-5">
          <h1 className="text-3xl font-bold">Login</h1>
          <hr className="w-[90%] md:w-[400px] my-10" />
          {/* //From er Div */}
          <div>
            <form
              className="flex flex-col space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register("email")}
                className="w-[90%] md:w-[400px] p-3 border border-blue-100 rounded-full outline-none"
                placeholder="Email"
              />
              <input
                {...register("password")}
                className="w-[90%] md:w-[400px] p-3 border border-blue-100 rounded-full outline-none"
                placeholder="Password"
              />
              <input
                className="w-[90%] md:w-[400px] rounded-full p-3 text-white bg-[#00a2ed] cursor-pointer"
                type="submit"
                value="Login"
              />
            </form>
          </div>
          <hr className="w-[90%] md:w-[400px] my-10" />
          <h1 className=" text-center">
            New Customer ?{" "}
            <Link to={"/register"} className="text-[#00a2ed]">
              Register
            </Link>{" "}
            Here
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
