import Collection from "../models/Collection";
import Customer from "../models/Customer";
import Order from "../models/Order";
import Product from "../models/Product";
import { connectToDB } from "../mongoDB"
import { format } from "date-fns";


export const getTotalSales = async () => {
  await connectToDB();
  const orders = await Order.find();
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)
  return { totalOrders, totalRevenue }
}

export const getProductById = async (productId: String) => {
  try {
    await connectToDB();

    const product = await Product.findById(productId).populate({
      path: "collections",
      model: Collection,
    }).select("-reviews");
    const collections = await Collection.find().sort({ createdAt: "desc" })

    if (!product) {
      throw new Error("Product not found");
    }
    return JSON.parse(JSON.stringify({
      product,
      collections
    }))
  } catch (err) {
    console.log("[productId_GET],[collections_GET]", err);
    throw new Error("Internal error");
  }
};

export const getCollections = async () => {
  try {
    await connectToDB()
    const collections = await Collection.find().sort({ createdAt: "desc" })
    return JSON.parse(JSON.stringify(collections))
  } catch (err) {
    console.log("[collections_GET]", err)
    throw new Error("Internal Server Error")
  }
}

export const getTotalCustomers = async () => {
  await connectToDB();
  const totalCustomers = await Customer.countDocuments({});
  return totalCustomers
}
export const getTotalProducts = async () => {
  await connectToDB();
  const totalProduct = await Product.countDocuments({});
  return totalProduct;
}

export const getSalesPerMonth = async () => {
  await connectToDB()
  const orders = await Order.find()

  const salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth(); // 0 for Janruary --> 11 for December
    acc[monthIndex] = (acc[monthIndex] || 0) + order.totalAmount;
    // For June
    // acc[5] = (acc[5] || 0) + order.totalAmount (orders have monthIndex 5)
    return acc
  }, {})

  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(0, i))
    // if i === 5 => month = "Jun"
    return { name: month, sales: salesPerMonth[i] || 0 }
  })

  return graphData
}

export const getOrders = async () => {
  try {
    await connectToDB()

    const orders = await Order.find().sort({ createdAt: "desc" });

    const orderDetails = await Promise.all(orders.map(async (order) => {
      const customer = await Customer.findOne({ clerkId: order.customerClerkId })
      return {
        _id: order._id,
        customer: customer.name,
        products: order.products.length,
        status: order.status,
        totalAmount: order.totalAmount,
        currency: order.currency,
        exchangeRate: order.exchangeRate,
        createdAt: format(order.createdAt, "MMM do, yyyy")
      }
    }))

    return JSON.parse(JSON.stringify(orderDetails));
  } catch (err) {
    console.log("[orders_GET]", err)
    throw new Error("Internal Server Error");
  }
}
