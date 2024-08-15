import ProductForm from "@/components/products/ProductForm"
import { getCollections } from "@/lib/actions/actions"

const CreateProduct = async() => {
  const collection =await getCollections();
  return (
    <ProductForm collections={collection}/>
  )
}

export default CreateProduct