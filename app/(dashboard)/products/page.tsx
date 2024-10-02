import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "@/components/products/ProductColumns";
import ProductSearch from "@/components/custom ui/ProductSearch";
import Link from "next/link";
import { ScalableDataTable } from "@/components/custom ui/ScalableDataTable";

const Products = async ({ searchParams }: { searchParams: { key: string, query: string, page: string } }) => {
  const key = searchParams.key || ''
  const query = searchParams.query || ''
  const page = Number(searchParams.page) || 0

  const res = await fetch(`http://localhost:3000/api/products?page=${0}&key=${key}&search=${query}`, {
    method: "GET",
  });
  const data = await res.json();
  const products = data.data;
  const totalPages = data.totalPages;
  const totalProducts = data.totalProducts;


  return (
    <div className="px-10 py-5">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <p className="text-heading2-bold">Products ({totalProducts}) {query && <span>Results for "{query}"</span>}</p>
        <Link href={"/products/new"}>
          <Button className="bg-blue-1 text-white" >
            <Plus className="h-4 w-4 mr-2" />
            Create Product
          </Button>
        </Link>
      </div>

      <Separator className="bg-grey-1 my-4" />

      <ProductSearch item="products" />

      <ScalableDataTable
        columns={columns}
        data={products}
        currentPage={page}
        totalPage={totalPages}
      />
    </div>
  );
};

export default Products;
