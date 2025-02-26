import { useLocation } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/feature/bikes/bikeApi";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { getCurrentUser } from "../../redux/feature/auth/auth.slice";
import toast from "react-hot-toast";
import { FieldValues } from "react-hook-form";
import { useAddOrderMutation } from "../../redux/feature/orders/orderApi";
import { TUser } from "../Dashboard/User/user.types";

const CheckOut = () => {
  const [orderQuantity, setOrderQuantity] = useState(1);

  const user: TUser | null = useAppSelector(getCurrentUser);

  const location = useLocation();
  
  const id = location.state.id;
  const { data, isLoading } = useGetSingleBikeQuery(id);
  const [addOrder] = useAddOrderMutation();
  const { image, model, brand, price, quantity } = data.data;
  const [bikePrice, setBikePrice] = useState(price);

  // const handlePriceChange = (quan) => {
  //   setBikePrice(Number(quan) * price);
  // };

  const handlePayment = async (e: FieldValues) => {

    e.preventDefault();
    if (orderQuantity > quantity) {
      return toast.error(
        `Only ${quantity} bikes are available, you cant order more than that`
      );
    }

    const order = {
      name: user?.name,
      email: user?.email,
      product: id,
      quantity: orderQuantity,
      totalPrice: bikePrice,
    };
    const placeOrder = await addOrder(order);
    console.log(placeOrder);
    const checkoutUrl = placeOrder?.data?.data?.payment?.checkout_url;
    window.location.href = checkoutUrl;
    // console.log(placeOrder.data.data.payment.checkout_url);
    console.log("Order Quantity and Price", orderQuantity, bikePrice);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-5">
      <h1 className="font-semibold text-2xl underline text-[#00a2ed] my-5">
        Review Your Booking
      </h1>
      <div className="flex flex-col md:flex-row bg-white py-10">
        <div className="w-full md:w-[45%]">
          <img src={image} alt="" />
        </div>
        <div className="w-full md:w-[45%] mx-auto p-5">
          <form onSubmit={handlePayment} action="">
            <div className="flex justify-between mb-5">
              <div className="flex flex-col w-[48%] space-y-2">
                <label className="font-semibold" htmlFor="">
                  Name
                </label>
                <input
                  readOnly
                  value={user?.name}
                  className="outline-none bg-gray-200 p-2 rounded-xl"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="flex flex-col w-[48%] space-y-2">
                <label className="font-semibold" htmlFor="">
                  Email
                </label>
                <input
                  readOnly
                  value={user?.email}
                  className="outline-none bg-gray-200 p-2 rounded-xl"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="flex justify-between mb-5">
              <div className="flex flex-col w-[48%] space-y-2">
                <label className="font-semibold" htmlFor="">
                  Bike Model
                </label>
                <input
                  defaultValue={model}
                  readOnly
                  className="outline-none bg-gray-200 p-2 rounded-xl"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <div className="flex flex-col w-[48%] space-y-2">
                <label className="font-semibold" htmlFor="">
                  Bike Brand
                </label>
                <input
                  readOnly
                  defaultValue={brand}
                  className="outline-none bg-gray-200 p-2 rounded-xl"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-[48%] space-y-2">
                <label className="font-semibold" htmlFor="">
                  Order Quantity
                </label>
                <input
                  onChange={(e) => {
                    setOrderQuantity(Number(e.target.value));
                    setBikePrice(Number(e.target.value) * price);
                  }}
                  min={1}
                  max={3}
                  defaultValue={orderQuantity}
                  className="outline-none bg-gray-200 p-2 rounded-xl"
                  type="number"
                  name="qua"
                  id=""
                />
              </div>
              <div className="flex flex-col w-[48%] space-y-2">
                <label className="font-semibold" htmlFor="">
                  Total Price
                </label>
                <input
                  readOnly
                  value={`${bikePrice} TK.`}
                  className="outline-none bg-gray-200 p-2 rounded-xl"
                  type="text"
                  name=""
                  id=""
                />
              </div>
            </div>
            <div className="text-center my-10">
              <button
                type="submit"
                onClick={handlePayment}
                className="w-3/4 px-6 py-2 bg-[#00a2ed] text-white rounded-2xl "
              >
                Make Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
