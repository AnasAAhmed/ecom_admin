import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: String,
  media: [String],
  category:String,
  slug: { type: String, unique: true },
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

ProductSchema.index({ title: 'text', tags: 'text' });

ProductSchema.index({ slug: 1, category: 1 });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
