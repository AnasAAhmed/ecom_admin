import ProductForm from '@/components/products/ProductForm'
import { getProductById } from '@/lib/actions/actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Borcelle - Update Product",
  description: "Update Products for Borcelle's store",
};


const ProductDetails = async ({ params }: { params: { productId: string } }) => {
  const res = await getProductById(params.productId)
  return (
    <ProductForm initialData={res.product} collections={res.collections} />
  )
}

export default ProductDetails