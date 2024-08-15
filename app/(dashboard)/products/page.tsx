"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns } from "@/components/products/ProductColumns";
import { Input } from "@/components/ui/input";
import { DataTablePRoducts } from "@/components/custom ui/DataTableProducts";
import Head from "next/head";

const Products = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchId, setSearchId] = useState("");
  const pageSize = 10
  
  const getProducts = async (page = 0, id = '', title = "") => {
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
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts(pageIndex, searchId, search);
  }, [pageIndex, searchId, search, refresh]);
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') setSearch(searchValue);
  }
  
  return (
    <>
    <Head>
        <title>Best Products in 2024 - My E-commerce Store</title>
        <meta name="description" content="Discover the best products in 2024 with great deals and discounts. Shop now at My E-commerce Store!" />
        <meta property="og:title" content="Best Products in 2024" />
        <meta property="og:description" content="Shop the best products with exclusive discounts. Don't miss out!" />
        <meta property="og:url" content="https://www.myecommercestore.com/best-products-2024" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.myecommercestore.com/best-products-2024" />
      </Head>
    <div className="px-10 py-5">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <p className="text-heading2-bold">Products ({totalProducts})</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <div className="flex items-center  flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search by title..."
          value={searchValue}
          required
          name="title"
          onChange={(event) => setSearchValue(event.target.value)}
          className="max-w-sm"
          onKeyDown={handleKeyDown}
          />
        <Button onClick={() => setSearch(searchValue)}>Search</Button>
        <Input
          name="id"
          placeholder="Search by ID..."
          value={searchId}
          onChange={(event) => setSearchId(event.target.value)}
          className="max-w-sm"
          />
        <Button onClick={() => setRefresh(!refresh)}><RefreshCw /></Button>
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
          </>
  );
};

export default Products;
