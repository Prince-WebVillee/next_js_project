import Link from "next/link";
import { useState } from "react";
import baseUrl from "../helpers/baseUrl";
import { useRouter } from "next/router";

const addProduct = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !image || !description) {
      e.preventDefault();
      M.toast({ html: "Please Fill in All the Fields", classes: "red" });
    } else {
      const imageUrl = await imageUpload();

      const data = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          name,
          imageUrl,
          price,
          description,
        }),
      });
      const res = await data.json();

      if (res.error) {
        M.toast({ html: res.error, classes: "red" });
      } else {
        M.toast({
          html: "Product Saved",
          classes: "green",
          displayLength: 500,
        });
        setTimeout(() => {
          router.push("/");
        }, 500);
      }
    }
  };
  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "prince-image-server");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/prince-image-server/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    console.log(res2);

    return res2.url;
    // if (!res2) {
    //   return (
    //     <div class="text-center">
    //       <svg
    //         role="status"
    //         class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    //         viewBox="0 0 100 101"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
    //           fill="currentColor"
    //         />
    //         <path
    //           d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
    //           fill="currentFill"
    //         />
    //       </svg>
    //     </div>
    //   );
    // } else {}
  };

  return (
    <div className="mx-auto w-1/2 shadow mt-5">
      <div className="text-center">
        <h1 className="text-2xl">Add Product</h1>
      </div>
      <form className="p-5 " onSubmit={(e) => handleSubmit(e)}>
        <div className="relative z-0 mb-2 w-full group">
          <input
            type="text"
            name="floating_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative z-0 mb-2 w-full group">
          <input
            type="number"
            name="floating_price"
            id="floating_price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Product Price "
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="relative z-0 mb-2 w-full group">
          <textarea
            placeholder="Product Description"
            className="materialize-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="relative z-0 mb-2  group file-field input-field">
          <div className="">
            <div>
              <span className="waves-effect waves-light ">
                Upload Image<i className="material-icons left">upload_file</i>
              </span>
              {/* <span>
              <i className="material-icons left">upload_file</i>Upload Image
            </span> */}
            </div>
            <div></div>
            <input
              className=""
              id="multiple_files"
              type="file"
              multiple=""
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <div className="ml-50 mb-4">
          {" "}
          {image ? (
            <img
              className="responsive-img mr-28"
              src={image ? URL.createObjectURL(image) : ""}
              height={100}
              width={100}
            />
          ) : (
            ""
          )}
        </div>
        <button
          type="submit"
          className="btn  waves-effect waves-light bg-blue-600"
        >
          Add<i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  );
};

export default addProduct;
