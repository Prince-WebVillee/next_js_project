const Product = ({ product }) => {
  
  return (
    <div>
      <h1>Product Page</h1>
    </div>
  );
};

// import Product from "../../../models/Product";
// export default async (req, res) => {
//   const { pid } = req.query;
//   const product = await Product.findOne({ _id: pid });

//   res.status(200).json({ product });
// };

export const getServerSideProps = async ({ params: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/product/${id}`);
  const data = await res.json();
  return {
    props: { product: data },
  };
};

export default Product;
