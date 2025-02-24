/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetSingleBikeQuery,
  useUpdateBikeMutation,
} from "../../../redux/feature/bikes/bikeApi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const EditBike = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.id);
  const id = location.state.id;

  const { data: bike, isLoading } = useGetSingleBikeQuery(id);
  const [updateBike] = useUpdateBikeMutation();
  console.log("Data paiso  ?", bike?.data);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const name = e.target.name.value;
      const image = e.target.image.files[0];
      const brand = e.target.brand.value;
      const description = e.target.description.value;
      const model = e.target.model.value;
      const category = e.target.category.value;
      const quantity = parseInt(e.target.quantity.value);
      const price = parseInt(e.target.price.value);
      if (!image) {
        return Swal.fire("File is required");
      }
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "kazishahed");
      data.append("cloud_name", "dsvcr6xza");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsvcr6xza/image/upload",
        { method: "POST", body: data }
      );
      const uploadedFileUrl = await res.json();
      const bike = {
        name,
        model,
        brand,
        description,
        category,
        quantity,
        price,
        image: uploadedFileUrl.url,
      };

      const response = await updateBike({ id, ...bike });

      console.log("Bike Update Hoise ? ", response);
      if (response.data?.success) {
        toast.success("Bike Added Successfully!");
        navigate("/dashboard/manageBike");
      }
      console.log(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-gray-50">
      <h1 className="pt-10 mb-10 text-center font-bold text-xl uppercase underline ">
        Edit Bike Details
      </h1>
      <form onSubmit={handleSubmit} className="border px-2 md:px-5 py-5 rounded-xl mx-1 md:mx-5">
        <div className="flex gap-1 md:gap-5 justify-between">
          <div className="flex flex-col w-1/2">
            <label className=" uppercase font-bold text-lg my-3">
              Bike Name
            </label>
            <input
              defaultValue={bike?.data.name}
              className="p-3 outline-none border rounded-xl bg-gray-200"
              type="text"
              name="name"
              id=""
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className=" uppercase font-bold text-lg my-3">
              Bike Model
            </label>
            <input
              defaultValue={bike?.data.model}
              className="p-3 outline-none border rounded-xl bg-gray-200"
              type="text"
              name="model"
              id=""
            />
          </div>
        </div>
        <div className="flex gap-1 md:gap-5 justify-between">
          <div className="flex flex-col w-1/2">
            <label className=" uppercase font-bold text-lg my-3">Brand</label>
            <select
              defaultValue={bike?.data.brand}
              name="brand"
              className="p-3 outline-none border rounded-xl bg-gray-200"
            >
              <option value="Yamaha">Select a brand</option>
              <option value="Yamaha">Yamaha</option>
              <option value="Suzuki">Suzuki</option>
              <option value="Honda">Honda</option>
              <option value="Hero">Hero</option>
              <option value="Royal_Enfield">Royal Enfield</option>
            </select>
          </div>
          <div className="flex flex-col w-1/2">
            <label className=" uppercase font-bold text-lg my-3">
              Category
            </label>
            <select
              defaultValue={bike?.data.category}
              name="category"
              className="p-3 outline-none border rounded-xl bg-gray-200"
            >
              <option value="Standard">Select a category</option>
              <option value="Standard">Standard</option>
              <option value="SportBike">SportBike</option>
              <option value="Electric">Electric</option>
              <option value="Scooter">Scooter</option>
            </select>
          </div>
        </div>
        <div className="flex gap-1 md:gap-5 justify-between">
          <div className="flex flex-col w-1/2">
            <label className=" uppercase font-bold text-lg my-3">
              Quantity
            </label>
            <input
              defaultValue={bike?.data.quantity}
              className="p-3 outline-none border rounded-xl bg-gray-200"
              type="number"
              name="quantity"
              id=""
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className=" uppercase font-bold text-lg my-3">Price</label>
            <input
              defaultValue={bike?.data.price}
              className="p-3 outline-none border rounded-xl bg-gray-200"
              type="number"
              name="price"
              id=""
            />
          </div>
        </div>
        {/* <div className="flex gap-5 justify-between">
                        <div className="flex flex-col w-1/2">
                            <label className="text-[#00026e] uppercase font-bold text-lg my-3">Quantity</label>
                            <input className="p-3 outline-none border rounded-xl" type="text" name="total_time" id="" />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="text-[#00026e] uppercase font-bold text-lg my-3">Total Stops</label>
                            <input className="p-3 outline-none border rounded-xl" type="text" name="total_stops" id="" />
                        </div>
                    </div> */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <label className=" uppercase font-bold text-lg my-3">
              Description
            </label>
            {/* <input className="p-3 outline-none border rounded-xl" type="text" name="total_fare" id="" /> */}
            <textarea
              defaultValue={bike?.data.description}
              className="p-3 outline-none border rounded-xl bg-gray-200"
              rows={4}
              name="description"
              id=""
            ></textarea>
          </div>
          <div className="flex flex-col items-center">
            <label className=" uppercase font-bold text-lg my-3">image</label>
            <input
              required
              type="file"
              // id='image'
              name="image"
              // accept='image/*'
              className="file-input file-input-bordered file-input-success w-full max-w-xs"
            />
          </div>
        </div>
        <div className="flex justify-center items-center mt-5">
          <input
            className="w-full md:w-1/2 bg-[#00a2ed] text-white font-bold p-3 rounded my-3 cursor-pointer"
            type="submit"
            value="Edit Bike"
          />
        </div>
      </form>
    </div>
  );
};

export default EditBike;
