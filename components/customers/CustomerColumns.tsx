"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Clipboard } from "lucide-react";
import toast from "react-hot-toast";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "clerkId",
    header: "Clerk Id",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className=" relative tool"
            data-tooltip={row.original.clerkId}
          >
            {row.original.clerkId.slice(0, 7)}...
          </div>
          <span onClick={() => { navigator.clipboard.writeText(row.original.clerkId); toast.success('text copied') }}>
            <Clipboard className="cursor-pointer h-3 w-3 " />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "_id",
    header: "_id",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          <div className=" relative tooltip"
            data-tooltip={row.original._id}
          >
            {row.original._id.slice(0, 7)}...
          </div>
          <span onClick={() => { navigator.clipboard.writeText(row.original._id); toast.success('text copied') }}>
            <Clipboard className="cursor-pointer h-3 w-3 " />
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
  },
];
