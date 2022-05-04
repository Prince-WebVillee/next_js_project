import Product from "../../../models/Product";
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
  }
};

const getProduct = async (req, res) => {
  const { pid } = req.query;
  const product = await Product.findOne({ _id: pid });
  // console.log(product);
  res.status(200).json({ product });
};

const deleteProduct = async (req, res) => {
  const { pid } = req.query;
  const product = await Product.findByIdAndDelete({ _id: pid });
  res.status(200).json({});
};
