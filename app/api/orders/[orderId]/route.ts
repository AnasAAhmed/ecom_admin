import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { orderId: String } }) => {
  try {
    await connectToDB()

    const orderDetails = await Order.findById(params.orderId).populate({
      path: "products.product",
      model: Product
    })

    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), { status: 404 })
    }

    return NextResponse.json(orderDetails, { status: 200 })
  } catch (err) {
    console.log("[orderId_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const PUT = async (req: NextRequest, { params }: { params: { orderId: String } }) => {
  try {
    const { status } = await req.json();
    const { userId, sessionClaims } = auth();

    if (!userId && sessionClaims?.metadata.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();

    const order = await Order.findById(params.orderId);

    if (!order) return new NextResponse("Order not found", {
      status: 404,
    });


    if (status) {
      order.status = status;
    }
    await order.save();

    return NextResponse.json("Order Status Updated Successfully", { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
    } else {
      return new NextResponse('An unknown error occurred', { status: 500 });
    }
  }
};

export const DELETE = async (req: NextRequest, { params }: { params: { orderId: String } }) => {
  try {
    await connectToDB()
    const order = await Order.findById(params.orderId);
    if (!order) return NextResponse.json("Order Not Found", { status: 404 });

    await order.deleteOne();

    return NextResponse.json("Order Deleted Successfully", { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
    } else {
      return new NextResponse('An unknown error occurred', { status: 500 });
    }
  }

};
export const dynamic = "force-dynamic";