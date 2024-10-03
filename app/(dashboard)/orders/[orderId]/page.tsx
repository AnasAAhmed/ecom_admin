'use client'
import { useEffect, useState } from "react";
import { columns } from "@/components/orderItems/OrderItemsColums";
import OrderManagement from "@/components/orders/OrderManagment";
import Link from "next/link";
import toast from "react-hot-toast";
import Loader from "@/components/custom ui/Loader";
import { DataTable } from "@/components/custom ui/DataTable";
import { Metadata } from "next";
type Lol = { street: string; city: string; state: string; postalCode: string; country: string; }
type Order = {
  _id: string
  customerEmail: String,
  products: [],
  shippingAddress: Lol,
  shippingRate: string,
  totalAmount: number,
  currency: string,
  status: string,
  exchangeRate: number,

}

export const metadata: Metadata = {
  title: "Borcelle - Order Details",
  description: "Manage single order in Borcelle's admin panel",
};

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
  const [orderDetails, setOrderDetails] = useState<Order>();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const order = await fetch(`/api/orders/${params.orderId}`);
        const data = await order.json();
        setOrderDetails(data);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        toast.error("Failed to fetch order details:" + error)
      }
    };

    fetchOrderDetails();
  }, [params.orderId]);

  if (!orderDetails) {
    return <Loader/>;
  }

  const shippingAddress = orderDetails.shippingAddress || {};
  const { street, city, state, postalCode, country } = shippingAddress;
  return (
    <div className="flex flex-col p-10 gap-5">
      <Link href={'/orders'} className="text-base-bold">←</Link>
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Currency: <span className="text-base-medium">{orderDetails.currency}</span>
      </p>
      <p className="text-base-bold">
        ExchangeRate: <span className="text-base-medium">{orderDetails.exchangeRate}</span>
      </p>
      <p className="text-base-bold">
        Customer Email: <span className="text-base-medium">{orderDetails.customerEmail}</span>
      </p>
      <p className="text-base-bold">
        Shipping address: <span className="text-base-medium">{street}, {city}, {state}, {postalCode}, {country}</span>
      </p>
      <p className="text-base-bold">
        Total Paid: <span className="text-base-medium">${orderDetails.totalAmount}</span>
      </p>
      <p className="text-base-bold">
        Shipping rate ID: <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>
      <p className="text-base-bold">
        Status: <span className="text-base-medium">{orderDetails.status}</span>
      </p>
      <OrderManagement orderId={orderDetails._id} currentStatus={orderDetails.status} />
      <DataTable columns={columns} data={orderDetails.products} searchKeys={["product", "color", "size", "quantity"]} />
    </div>
  );
};

export default OrderDetails;
