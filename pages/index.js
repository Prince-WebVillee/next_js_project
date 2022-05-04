import Link from "next/link";
import baseUrl from "../helpers/baseUrl";
const HomePage = ({ products }) => {
  console.log(products);
  return (
    <div className="container  mt-6 flex flex-wrap justify-items-center">
      {products.map((item, index) => {
        return (
          <div className="card w-60 mx-4 center-align " key={index}>
            <div className="card-image ">
              <img src={item.imageUrl} />
              <span className="card-title mt-3">{item.name}</span>
            </div>
            <div className="card-content">
              <p>${item.price}</p>
            </div>
            <div className="text-blue-700 mb-3">
              <Link href={`/product/[id]`} as={`/product/${item._id}`}>
                <a className="btn waves-effect bg-blue-600 ">View Product</a>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const res = await fetch(`${baseUrl}/api/products`);
  const data = await res.json();
  return {
    props: { products: data },
  };
};
