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
  // console.log(name, price, description, imageUrl);
  try {
    if (!name || !price || !description || !imageUrl) {
      res.status(422).json({ error: "Please Fill in All The Fields" });
    }
    const product = await new Product({
      name,
      price,
      description,
      imageUrl,
    }).save();

    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ error: "internal sever error" });
    console.log(err);
  }
};
