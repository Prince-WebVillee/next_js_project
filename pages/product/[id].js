import { useRouter } from "next/router";
import Link from "next/link";
import baseUrl from "../../helpers/baseUrl";
import { useRef, useEffect } from "react";

const Products = ({ product }) => {
  const router = useRouter();
  const modalRef = useRef(null);
  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);
  if (router.isFallback) {
    return (
      <div class="text-center">
        <svg
          role="status"
          class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }
  const result = product;
  const final = result.product;
  const closeModal = () => {
    var elem = document.getElementById("modal1");
    var instance = M.Modal.getInstance(elem);
    instance.close();
  };

  const getModal = () => {
    return (
      <div id="modal1" className="modal text-center mt-10" ref={modalRef}>
        <div className="modal-content">
          <h4>{final.name}</h4>
          <p className="mt-10 fw-bold">
            Are You Sure You Want To Delete This ?
          </p>
        </div>
        <div className="modal-footer">
          <div className="flex flex-wrap justify-between">
            <div className="text-left">
              <button
                onClick={() => closeModal()}
                className="btn waves-effect waves-light #1565c0 blue darken-3"
              >
                Cancel
                <i className="material-icons left">close</i>
              </button>
            </div>
            <div className="text-right">
              <button
                onClick={() => deleteProduct()}
                className="btn waves-effect waves-light #c62828 red darken-3"
              >
                Yes
                <i className="material-icons left">delete</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${final._id}`, {
      method: "DELETE",
    });
    await res.json();
    M.toast({
      html: "Product Deleted Successfully",
      classes: "red",
      displayLength: 500,
    });
    setTimeout(() => {
      router.push("/");
    }, 500);
  };
  return (
    <div className="container flex flex-wrap mt-20">
      <div className="w-1/3">
        <img src={final.imageUrl} className="object-cover" />
        <div className="text-center">
          <h1>{final.name}</h1>
        </div>
      </div>
      <div className=" w-1/2 mx-10">
        <div>
          <h1 className="fw-bold fs-3"> Product Description</h1>
        </div>
        <p className="mt-10">{final.description}</p>
        <p className="mt-10">
          Price : <span className="fw-bold fs-3">${final.price}</span>
        </p>
        <div className="mt-5">
          <input
            type="number"
            style={{ width: "400px", margin: "10px" }}
            min="1"
            max="10"
            placeholder="Quantity"
            defaultValue={1}
          />
          <button
            className="btn waves-effect waves-light #1565c0 blue darken-3"
            name=""
          >
            Add
            <i className="material-icons right">add</i>
          </button>
        </div>
        <div className="mt-8">
          <button
            data-target="modal1"
            className="btn modal-trigger waves-effect waves-light #c62828 red darken-3"
          >
            Delete Product
            <i className="material-icons left">delete</i>
          </button>

          {getModal()}
        </div>
      </div>
    </div>
  );
};

// export const getServerSideProps = async ({ params: { id } }) => {
//   const res = await fetch(`http://localhost:3000/api/product/${id}`);
//   const data = await res.json();
//   return {
//     props: { product: data },
//   };
// };
export const getStaticProps = async ({ params: { id } }) => {
  const res = await fetch(`${baseUrl}/api/product/${id}`);
  const data = await res.json();
  return {
    props: { product: data },
  };
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "6271071a00a43b4471c60a1a" } }],
    fallback: true, // false or 'blocking'
  };
}

export default Products;
