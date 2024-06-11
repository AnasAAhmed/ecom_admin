import { DataTable } from '@/components/custom ui/DataTable';
import { columns } from '@/components/customers/CustomerColumns';
import { Separator } from '@/components/ui/separator';
import Customer from '@/lib/models/Customer';
import { connectToDB } from '@/lib/mongoDB';
import { format } from "date-fns";

interface CustomerTypeSSR {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
}
const Customers = async () => {
  await connectToDB();
  const customers = await Customer.find().sort({ createdAt: 'desc' }).lean();

  // Ensure customers are plain objects
  const plainCustomers: CustomerTypeSSR[] = customers.map(customer => ({
    _id: (customer._id as string).toString(),
    clerkId: customer.clerkId,
    name: customer.name,
    email: customer.email,
    createdAt: format(customer.createdAt, "MMM do, yyyy"),
  }));

  return (
    <div className='px-10 py-5'>
      <p className='text-heading2-bold'>Customers</p>
      <Separator className='bg-grey-1 my-5' />
      <DataTable columns={columns} data={plainCustomers} searchKeys={['clerkId', '_id', 'name', 'email', 'createdAt']} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Customers;
