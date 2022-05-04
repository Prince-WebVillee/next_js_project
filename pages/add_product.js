import Link from "next/link";
import { useState } from "react";
import baseUrl from "../helpers/baseUrl";
const addProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetch(`${baseUrl}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        productName,
        productImage: "",
        productPrice,
        productDescription,
      }),
    });
    const res = await data.json();
    if (res.error) {
      M.toast({ html: res.error, classes: "red" });
    } else {
    }
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
            required=""
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="relative z-0 mb-2 w-full group">
          <input
            type="number"
            name="floating_price"
            id="floating_price"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Product Price "
            required=""
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="relative z-0 mb-2 w-full group">
          <textarea
            placeholder="Product Description"
            className="materialize-textarea"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
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
              onChange={(e) => setProductImage(e.target.files[0])}
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <div className="ml-50 mb-4">
          {" "}
          {productImage ? (
            <img
              className="responsive-img mr-28"
              src={productImage ? URL.createObjectURL(productImage) : ""}
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
