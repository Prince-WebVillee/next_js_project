import Link from "next/link";
const ProductPage = () => {
  return (
    <div>
      <h1 className="text-green-400">Product Page</h1>
      <Link href="/">
        <a className="text-blue-400 underline">Go To Home Page</a>
      </Link>
    </div>
  );
};

export default ProductPage;
