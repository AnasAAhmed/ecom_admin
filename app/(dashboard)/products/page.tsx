"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "@/components/products/ProductColumns";
import { Input } from "@/components/ui/input";
import { DataTablePRoducts } from "@/components/custom ui/DataTableProducts";

const Products = () => {
  const router = useRouter();
  const pageSize = 10;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchParams, setSearchParams] = useState({ id: "", title: "" });

  const getProducts = useCallback(async (page = 0, id = "", title = "") => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products?page=${page}&id=${id}&search=${title}`, {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data.data);
      setTotalPages(data.totalPages);
      setTotalProducts(data.totalProducts);
      setLoading(false);
    } catch (err) {
      console.error("[products_GET]", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProducts(pageIndex, searchParams.id, searchParams.title);
  }, [pageIndex, searchParams, getProducts]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>, key: keyof typeof searchParams) => {
   
    if (e.key === 'Enter') {
      setSearchParams(prev => ({ ...prev, [key]: (e.target as HTMLInputElement).value }));
    }
  };

  const handleRefresh = () => {
    setSearchParams({ id: "", title: "" });
    setPageIndex(0);
    getProducts(0);
  };

  return (
    <div className="px-10 py-5">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <p className="text-heading2-bold">Products ({totalProducts})</p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/products/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>

      <Separator className="bg-grey-1 my-4" />

      <div className="flex items-center flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search by title..."
          onKeyDown={(e) => handleSearch(e, "title")}
          className="max-w-sm"
        />
        <Input
          placeholder="Search by ID..."
          onKeyDown={(e) => handleSearch(e, "id")}
          className="max-w-sm"
          minLength={24}
        />
        <Button onClick={handleRefresh}>
          <RefreshCw />
        </Button>
      </div>

      <DataTablePRoducts
        columns={columns}
        data={products}
        searchKey="title"
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        totalPages={totalPages}
        loading={loading}
      />
    </div>
  );
};

export default Products;
