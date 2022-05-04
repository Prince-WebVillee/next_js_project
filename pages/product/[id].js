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
    return <h3>Loading...</h3>;
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
    router.push("/");
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
