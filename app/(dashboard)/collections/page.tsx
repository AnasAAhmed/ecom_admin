"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getCollections = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/collections`, {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, [refresh]);
  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/collections/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable refresh={refresh} setRefresh={setRefresh} loading={loading} columns={columns} data={collections} searchKeys={["title"]} />
    </div>
  );
};

export default Collections;