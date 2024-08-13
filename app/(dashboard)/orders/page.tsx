import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";
import { getOrders } from "@/lib/actions/actions";

const Orders = async () => {
  const data = await getOrders();
  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5" />
      <DataTable
        columns={columns}
        data={data}
        searchKeys={['_id', 'status', 'totalAmount', 'customerClerkId', 'createdAt']}
      />
    </div>
  );
};



export default Orders;
