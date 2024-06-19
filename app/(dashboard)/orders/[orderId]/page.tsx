import CopyText from "@/components/custom ui/CopyText"
import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/orderItems/OrderItemsColums"
import OrderManagement from "@/components/orders/OrderManagment"
import Link from "next/link"

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(`${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`)
  const { orderDetails, customer } = await res.json();

  const { street, city, state, postalCode, country } = orderDetails.shippingAddress

  return (
    <div className="flex flex-col p-10 gap-5">
      <Link href={'/orders'} className="text-md text-blue-600">&larr; Back</Link>
      <p className="text-base-bold">
        {/* <CopyText text={orderDetails._id}/> */}
      </p>
      <p className="text-base-bold">
        Customer name: <span className="text-base-medium">{customer.name}</span>
      </p>
      <p className="text-base-bold">
        Customer email: <span className="text-base-medium">{customer.email}</span>
      </p>
      <p className="text-base-bold">
        Shipping address: <span className="text-base-medium">{street}, {city}, {state}, {postalCode}, {country}</span>
      </p>
      <p className="text-base-bold">
        Total Paid: <span className="text-base-medium">${orderDetails.totalAmount}</span>
      </p>
      <p className="text-base-bold">
        Status <span className="text-base-medium">{orderDetails.status}</span>
      </p>
      <p className="text-base-bold">
        Shipping rate ID: <span className="text-base-medium">{orderDetails.shippingRate}</span>
      </p>
      <OrderManagement orderId={orderDetails._id} currentStatus={orderDetails.status} />
      <p className="text-heading2-bold">Orders</p>
      <DataTable columns={columns} data={orderDetails.products} searchKeys={["product", 'color', 'size', 'quantity']} />
    </div>
  )
}

export default OrderDetails
