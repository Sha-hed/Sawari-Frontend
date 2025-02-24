import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBikes: builder.query({
      query: ({ model, category, brand, minimum, maximum, firstPage }) => ({
        url: "/bikes",
        params: { model, category, brand, minimum, maximum, firstPage },
      }),
    }),
    getSingleBike: builder.query({
      query: (bikeId) => ({
        url: `/bikes/${bikeId}`,
        method: "GET",
      }),
    })
  }),
});
const bikeApi2 = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBike: builder.mutation({
      query: (bikeInfo) => ({
        url: "/bikes/addBike",
        method: "POST",
        body: bikeInfo,
      }),
    }),
  }),
});
const bikeApi3 = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedBikes: builder.query({
      query: () => ({
        url: "/bikes/featured",
        method: "GET",
      }),
    }),
  }),
});
const delBikeApi3 = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/bikes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
const patchBikeApi4 = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateBike: builder.mutation({
      query: (bikeInfo) => ({
        url: `/bikes/update`,
        method: "POST",
        body: bikeInfo
      }),
    }),
  }),
});

export const { useGetAllBikesQuery, useGetSingleBikeQuery } = bikeApi;
export const { useAddBikeMutation } = bikeApi2;
export const { useGetFeaturedBikesQuery } = bikeApi3;
export const { useDeleteBikeMutation } = delBikeApi3
export const { useUpdateBikeMutation } = patchBikeApi4
