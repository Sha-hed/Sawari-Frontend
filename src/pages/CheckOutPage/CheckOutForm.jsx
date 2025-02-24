import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { PassContext } from "../Payment/PaymentAndMore";
import Swal from "sweetalert2";
import AuthHook from "../../../../hook/AuthHook";
import useAxiosCommon from "../../../../hook/useAxiosCommon";
import BookedEmail from "../../../../hook/BookedEmail";
import { useNavigate } from "react-router-dom";


const CheckOutForm = () => {
    const { user } = AuthHook();
    const [isBooked, refetch] = BookedEmail();
    const userEmail = user?.email
    const { fullName, email, phone, total, flight, ticketClass, travelDate, pay } = useContext(PassContext);
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const axiosCommon = useAxiosCommon();
    const navigate = useNavigate();
    const users = { price: pay }
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://zayaan-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(users),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret)
            });
    }, []);
    const handleSubmit = async (event) => {
        console.log('Payment Submit')
        // Block native form submission.
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('payment Error ', error)
            setError(error.message)
        } else {
            console.log('Payment Method ', paymentMethod)
            setError('');
        }

        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: fullName
                }
            }
        })
        if (cardConfirmError) {
            setError(cardConfirmError)
        } else {
            console.log("Payment Intent ", paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                const payment = {
                    Name: fullName,
                    userEmail,
                    email: user?.email,
                    phone,
                    totalTraveller: total,
                    price: pay,
                    ticketClass,
                    travelDate,
                    flight
                }
                const { data } = await axiosCommon.post('/payment', payment)
                refetch();
                console.log(data);
                console.log('Payment Successfully')
                Swal.fire({
                    title: "Booking Confirmed",
                    text: "Thanks for Booking",
                    icon: "success"
                })
                navigate('/myBookings')

            }
        }
    }


    return (
        <div>
            <div className="bg-gray-50 p-5 rounded-xl ml-1 md:ml-52 border-t-4 border-blue-900 shadow-xl">
                <h1 className="text-[#00026e] text-xl font-semibold mb-10 text-center underline">Enter Your Card Information</h1>
                <div className="flex flex-col w-full md:w-1/2">
                    <label className="text-[#00026e] font-semibold" htmlFor="">Email</label>
                    <input readOnly value={email} className="text-black border p-2 rounded-lg my-2 outline-none" type="email" name="email" id="" />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                    <label className="text-[#00026e] font-semibold" htmlFor="">Phone Number</label>
                    <input readOnly value={phone} className="border p-2 rounded-lg my-2 outline-none" type="text" name="Number" id="" />
                </div>
                <h1 className="mb-3 text-[#00026e] font-semibold">Card Number</h1>
                <form onSubmit={handleSubmit}>
                    <CardElement className="w-[90%] md:w-[500px] flex flex-col mx-auto md:mx-0"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: 'blue',
                                    '::placeholder': {
                                        color: 'red',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <div className="flex justify-center my-5">
                        <button className="w-full py-3 bg-blue-900 text-white font-semibold p-3 rounded-lg cursor-pointer" type="submit" disabled={!stripe || !clientSecret}>
                            Pay
                        </button>
                    </div>
                    {
                        error && <p className="text-red-600 font-xl">{error}</p>
                    }
                </form>
            </div>
        </div>
    );
};

export default CheckOutForm;