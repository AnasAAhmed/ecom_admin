"use client";

import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Loader from "./Loader";

interface DataTableProductsProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  pageIndex: number;
  pageSize: number;
  setPageIndex: any;
  totalPages: number;
  loading:boolean;
}

export function DataTablePRoducts<TData, TValue>({
  columns,
  data,
  pageIndex,
  pageSize,
  setPageIndex,
  totalPages,
  loading
}: DataTableProductsProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      pagination: { pageIndex,pageSize},
    },
    manualPagination: true,
    pageCount: totalPages,
  });

  return (
    <div className="py-5">
        {loading ? <div className="rounded-md border flex justify-center items-center h-[28rem]"><Loader /></div> :
        <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>}

      <div className="flex items-center justify-end space-x-2 py-4">
        <span className="mx-3">page-({pageIndex + 1}/{totalPages})</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((old: number) => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((old: number) => old + 1)}
          disabled={pageIndex >= totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
