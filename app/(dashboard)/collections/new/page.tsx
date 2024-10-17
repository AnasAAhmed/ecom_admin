import CollectionForm from "@/components/collections/CollectionForm"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Borcelle - Create Collection",
  description: "Page where admin can create collections in Borcelle's admin panel",
};
export const dynamic = 'force-static';
const CreateCollection = () => {
  return (
    <CollectionForm />
  )
}

export default CreateCollection