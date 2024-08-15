import ProductForm from '@/components/products/ProductForm'
import {  getProductById } from '@/lib/actions/actions';

const ProductDetails = async ({ params }: { params: { productId: string } }) => {
  const res = await getProductById(params.productId)
  return (
    <ProductForm initialData={res.product} collections={res.collections} />
  )
}

export default ProductDetails