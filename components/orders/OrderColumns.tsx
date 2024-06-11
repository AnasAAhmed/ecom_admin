"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Clipboard } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => {
      return (
        <div className="flex justify-between relative items-center">

          <Link
            href={`/orders/${row.original._id}`}
            className="hover:text-red-1 relative tooltip"
            data-tooltip={"Manage"}
          >
            {row.original._id.slice(0, 7)}...
          </Link>
          <span className="relative tooltip" data-tooltip={"Copy id"} onClick={() => { navigator.clipboard.writeText(row.original._id); toast.success('text copied') }}>
            <Clipboard className="cursor-pointer h-3 w-3 " />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total ($)",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    // cell: ({ row }) => {
    //   const date = new Date(row.original.createdAt);
    //   return date.toISOString().split('T')[0];
    // },
  },
];
