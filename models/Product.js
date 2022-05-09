import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },
});

const Product =
  mongoose.models.pd_products || mongoose.model("pd_products", productsSchema);

// const Product = mongoose.models.pd_products || ("pd_products", productsSchema);
export default Product;
