import mongoose from "mongoose";
import { slugify } from "../utils";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  media: [String],
  category: String,
  slug: String,
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  tags: [String],
  variants: [{
    size: { type: String },
    color: { type: String },
    quantity: { type: Number },
  }],
  numOfReviews: {
    type: Number,
    default: 0,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  stock: { type: Number },
  sold: { type: Number, default: 0 },
  price: { type: Number },
  expense: { type: Number },
}, { toJSON: { getters: true }, timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
