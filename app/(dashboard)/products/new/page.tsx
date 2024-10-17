import ProductForm from "@/components/products/ProductForm"
import { getCollections } from "@/lib/actions/actions"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Borcelle - Create Products",
  description: "Create Products to add in Borcelle's store",
};
export const dynamic = 'force-static';
const CreateProduct = async () => {
  const collection = await getCollections();
  return (
    <ProductForm collections={collection} />
  )
}

export default CreateProduct