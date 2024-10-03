import { ScalableDataTable } from "@/components/custom ui/ScalableDataTable";
import ProductSearch from "@/components/custom ui/ProductSearch";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";
import { getOrders } from "@/lib/actions/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Borcelle - Orders",
  description: "All Orders & Transactions to manage Borcelle's Orders data",
};

const Orders = async ({ searchParams }: { searchParams: { key: string; page: string, query: string } }) => {
  const key = searchParams.key || ''
  const query = searchParams.query || ''
  const page = Number(searchParams.page) || 0
  const data = await getOrders(key, query, page);
  const orders = data.data;
  const totalPages = data.totalPages;
  const totalOrders = data.totalOrders;
  return (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders ({totalOrders}) {query && <span>Results for &quot;{query}&quot;</span>}</p>
      <Separator className="bg-grey-1 my-5" />
      <ProductSearch item="orders" />
      <ScalableDataTable
        columns={columns}
        data={orders}
        currentPage={page}
        totalPage={totalPages}
      />
    </div>
  );
};



export default Orders;
