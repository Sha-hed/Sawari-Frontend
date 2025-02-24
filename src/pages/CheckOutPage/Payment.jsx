import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "../CheckOutForm/CheckOutForm";


//TODO: Add Publishible Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const Payment = () => {
    return (
        <div>
            <h1 className="text-[#00026e] text-xl font-semibold mt-10 mb-5 underline text-center md:text-start">Make Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;