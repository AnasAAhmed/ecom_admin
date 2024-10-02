"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";
import { Clipboard } from "lucide-react";
import toast from "react-hot-toast";
export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex justify-between relative items-center">
        <Link
          href={`/products/${row.original._id}`}
          className="relative hover:bg-gray-50 line-clamp-2 max-w-64 rounded-md tooltip"
          data-tooltip={"Edit"}
        >
          {row.original.title}
        </Link>
        <span className="relative tooltip" data-tooltip={"Copy id"} onClick={() => { navigator.clipboard.writeText(row.original._id); toast.success('text copied') }}>
          <Clipboard className="cursor-pointer h-3 w-3 " />
        </span>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    header: "actions",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];
