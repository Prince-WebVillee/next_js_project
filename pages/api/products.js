import initDB from "../../helpers/initDB";
import Product from "../../models/Product";
initDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getAllProducts(req, res);
      break;

    case "POST":
      await addProducts(req, res);
  }
};

const getAllProducts = async (req, res) => {
  Product.find({}).then((products) => {
    res.status(200).json(products);
  });
};

const addProducts = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  if (!name || !price || !description || !imageUrl) {
    res.status(402).json({ error: "Please Fill in All The Fields" });
  }
  const product = new Product({
    name,
    image,
    price,
    imageUrl: "",
  }).save();

  res.status(201).json({ product });
};
