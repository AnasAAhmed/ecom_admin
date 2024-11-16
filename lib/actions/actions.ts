import { isValidObjectId } from "mongoose";
import Collection from "../models/Collection";
import Customer from "../models/Customer";
import Order from "../models/Order";
import Product from "../models/Product";
import { connectToDB } from "../mongoDB"


export const getAdminData = async () => {
  await connectToDB();
  const orders = await Order.find().select('totalAmount');
  const totalProducts = await Product.countDocuments({});
  const totalUsers = await Customer.countDocuments({});
  const totalCustomers = await Customer.countDocuments({ ordersCount: { $gt: 0 } });
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0)
  return { totalOrders, totalRevenue, totalProducts, totalCustomers,totalUsers }
}

export const getSalesPerMonth = async () => {
  await connectToDB()
  const orders = await Order.find().select('totalAmount createdAt')

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

export const getProductById = async (productId: String) => {
  try {
    await connectToDB();

    const product = await Product.findById(productId).populate({
      path: "collections",
      model: Collection,
    });
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


export const getOrders = async (key: string, query: string, page: number) => {
  try {
    await connectToDB()
    const totalOrders = await Order.countDocuments({});

    let search: { [key: string]: any } = {};

    if (query) {
      if (key === 'customerEmail') search = { customerEmail: { $regex: query, $options: 'i' } };
      if (key === '_id' || isValidObjectId(query)) search = { _id: query };
      if (key === 'status') search = { status: { $regex: query, $options: 'i' } };
      if (key === 'createdAt') search = { createdAt: { $regex: query, $options: 'i' } };
    }
    const orders = await Order.find(search).sort({ createdAt: "desc" }).skip(page * 10).limit(10);

    if (!orders) return 'Order Not Found'

    return JSON.parse(JSON.stringify({
      data: orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / 10),
    }));
  } catch (err) {
    console.log("[orders_GET]", err)
    return "Internal Server Error" + (err as Error).message;
  }
}

export const getCustomers = async (key: string, query: string, page: number) => {
  try {
    await connectToDB();

    const totalCustomers = await Customer.countDocuments({});

    let search: { [key: string]: any } = {};

    if (query) {
      if (key === 'email') search = { email: { $regex: query, $options: 'i' } };
      if (key === '_id' || isValidObjectId(query)) search = { _id: query };
      if (key === 'clerkId') search = { clerkId: { $regex: query, $options: 'i' } };
      if (key === 'name') search = { name: { $regex: query, $options: 'i' } };
    }

    const customers = await Customer.find(search).sort({ createdAt: 'desc' });
    if (!customers) return 'Order Not Found';

    return JSON.parse(JSON.stringify({
      data: customers,
      totalCustomers,
      totalPages: Math.ceil(totalCustomers / 10),
    }));
  } catch (err) {
    console.log("[orders_GET]", err)
    return "Internal Server Error" + (err as Error).message;
  }
};

export const getProducts = async (key: string, query: string, page: number) => {
  try {
    await connectToDB();

    const totalProducts = await Product.countDocuments({});
    let search: { [key: string]: any } = {};

    if (query) {
      if (key === 'title') search = { title: { $regex: query, $options: 'i' } };
      if (key === '_id' || isValidObjectId(query)) search = { _id: query };
      if (key === 'category') search = { category: { $regex: query, $options: 'i' } };
    }
    const products = await Product.find(search)
      .sort({ createdAt: 'desc' })
      .skip(page * 10)
      .limit(10)
      .populate({ path: 'collections', model: Collection })
      .select("-media -ratings -numOfReviews -description -variants");

    return JSON.parse(JSON.stringify({
      data: products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / 10),
    }));
  } catch (err) {
    console.log("[orders_GET]", err)
    return "Internal Server Error " + (err as Error).message;
  }
}
