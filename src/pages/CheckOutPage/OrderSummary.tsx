/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useSearchParams } from "react-router-dom";
import { useVerifyOrderQuery } from "../../redux/feature/orders/orderApi";

const OrderSummary = () => {
  const [searchParams] = useSearchParams();

  // Get a specific search param
  const order_id = searchParams.get("order_id");
  const { data, isLoading } = useVerifyOrderQuery(order_id);

  console.log("Data ", data?.data[0]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 flex justify-center">
      {/* <h1 className="text-center font-semibold text-lg underline">Order Summary</h1> */}
      <div className="bg-white w-full md:w-[500px] p-5 flex flex-col justify-center space-y-5">
        <h1 className="text-center font-semibold text-lg underline">
          Order Summary
        </h1>
        <h1>Name : {data?.data[0].name} </h1>
        <h1>Email : {data?.data[0].email}</h1>
        <h1>Order Id : {data?.data[0].order_id}</h1>
        <h1>Amount Paid : {data?.data[0].amount} TK.</h1>
        <h1>
          Status :{" "}
          <a
            href="#"
            className={`rounded-xl ${
              data?.data[0].bank_status === "Success"
                ? "bg-green-600 p-2 font-semibold text-white"
                : data?.data[0].bank_status === "Failed"
                ? "bg-red-600 p-2 font-semibold text-white"
                : "bg-yellow-600 p-2 font-semibold text-white"
            }`}
          >
            {data?.data[0].bank_status}
          </a>
        </h1>
        <Link
          to="/face"
          className="w-1/2 mx-auto py-2 bg-[#00a2ed] text-white rounded-2xl text-center"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
