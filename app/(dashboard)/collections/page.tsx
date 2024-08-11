
import { Plus } from "lucide-react";
import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const Collections =async () => {
  const res = await fetch(`${process.env.ADMIN_DASHBOARD_URL}/api/collections`);
  const data = await res.json();
  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button className="bg-blue-1 text-white" >
          <Link href={'/collections/new'}>
            <Plus className="h-4 w-4 mr-2" />
            Create Collection
          </Link>
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={data} searchKeys={["title"]} />
    </div>
  );
};

export default Collections;