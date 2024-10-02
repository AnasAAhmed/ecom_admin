import { columns } from "@/components/collections/CollectionColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDB";
import { DataTable } from "@/components/custom ui/DataTable";

const Collections = async () => {
  let data;
  try {
    await connectToDB()

    const collections = await Collection.find().sort({ createdAt: "desc" }).select('-image')

    data = JSON.parse(JSON.stringify(collections))
  } catch (err) {
    console.log("[collections_GET]", err)
    throw new Error("Internal Server Error")
  }
  return (
    <div className="px-10 py-5">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <p className="text-heading2-bold">Collections</p>
        <Button className="bg-blue-1 text-white" >
          <Link className="flex items-center" href={'/collections/new'}>
            {/* <Plus className="h-4 w-4 mr-1" /> */}
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