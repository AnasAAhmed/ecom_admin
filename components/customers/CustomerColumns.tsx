"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Clipboard } from "lucide-react";
import toast from "react-hot-toast";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "googleId",
    header: "Google-Id",
  },
  {
    accessorKey: "ordersCount",
    header: "Orders",
    cell: ({ row }) => {
      return <>{row.original.ordersCount}</>
    },
  },
  {
    accessorKey: "image",
    header: "Avtar",
    cell: ({ row }) => {
      return <><img src={row.original.image!} alt="avatar" className="w-8 h-8 rounded-full" /></>
    },
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
    header: "Created At",
    cell: ({ row }) => {
      return <>{format(row.original.createdAt, "MMM do, yyyy")}</>;
    },
  },
];
