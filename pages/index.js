import Link from "next/link";
const HomePage = (prop) => {
  return (
    <div>
      <h1>Homepage</h1>
      <Link href="/products">
        <a>Go To Product Page</a>
      </Link>
    </div>
  );
};

export default HomePage;

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:3000/api/test");
//   const data = await res.json();
//   console.log(data);
//   return {
//     props: { message: data.message },
//   };
// };
