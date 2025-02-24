import { baseApi } from "../../api/baseApi";

const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/orders",
        method: "POST",
        body: orderInfo,
      }),
    }),
    getOrder: builder.query({
      query: ({ email }) => ({
        url: `/orders/getYourOrder?email=${email}`, // Proper query string usage
        method: "GET",
      }),
    }),
    getAllOrder: builder.query({
      query: () => ({
        url: "/orders/getAllOrder", // Proper query string usage
        method: "GET",
      }),
    }),
  }),
});

const orderApi2 = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateStatus: builder.mutation({
      query: (updateInfo) => ({
        url: 'orders/updateStatus', // ✅ Pass 'id' as a parameter
        method: "POST",
        body: updateInfo, // ✅ Send the update data in the request body
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrderQuery,
  useGetAllOrderQuery
} = OrderApi;


export const { useUpdateStatusMutation } = orderApi2