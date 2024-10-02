import { ScalableDataTable } from '@/components/custom ui/ScalableDataTable';
import ProductSearch from '@/components/custom ui/ProductSearch';
import { columns } from '@/components/customers/CustomerColumns';
import { Separator } from '@/components/ui/separator';
import { getCustomers } from '@/lib/actions/actions';


const Customers = async ({ searchParams }: { searchParams: { key: string; page: string, query: string } }) => {
  const key = searchParams.key || ''
  const query = searchParams.query || ''
  const page = Number(searchParams.page) || 0
  const data = await getCustomers(key, query, page);
  const customers = data.data;
  const totalPages = data.totalPages;
  const totalCustomers = data.totalCustomers;

  return (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Customers ({totalCustomers}) {query&&<span>Results for &quot;{query}&quot;</span>}</p>
      <Separator className='bg-grey-1 my-5' />
      <ProductSearch item='customers'/>
      <ScalableDataTable currentPage={page} columns={columns} data={customers} totalPage={totalPages} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Customers;
