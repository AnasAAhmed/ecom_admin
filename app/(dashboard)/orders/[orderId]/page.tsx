import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/orderItems/OrderItemsColums"
import OrderManagement from "@/components/orders/OrderManagment"
import { getOrderDetails } from "@/lib/actions/actions"

const OrderDetails = async ({ params }: { params: { orderId: string }}) => {
  const res = await getOrderDetails(params.orderId)
  
  const { orderDetails, customerName } =  res;

  const { street, city, state, postalCode, country } = orderDetails.shippingAddress

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-base-bold">
        Order ID: <span className="text-base-medium">{orderDetails._id}</span>
      </p>
      <p className="text-base-bold">
        Customer name: <span className="text-base-medium">{customerName}</span>
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
      <OrderManagement orderId={orderDetails._id} currentStatus={orderDetails.status}/>
      <DataTable columns={columns} data={orderDetails.products} searchKeys={["product", 'color', 'size', 'quantity']} />
      </div>
  )
}

export default OrderDetails