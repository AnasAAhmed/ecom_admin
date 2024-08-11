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
import { Input } from "../ui/input";
// import DropSearch from "./DropSearch";
import { ChevronRight, RefreshCw } from "lucide-react";
import Loader from "./Loader";
import React, { useState } from 'react'

type DropSearchProps = {
  setSearchValue: any;
  currentValue?: string;
  values: string[]
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKeys: string[];
  setRefresh?: any;
  refresh?: boolean;
  loading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKeys,
  setRefresh,
  refresh,
  loading,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchValue, setSearchValue] = useState(searchKeys[0]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="py-5">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder={`Search with ${searchValue}...`}
          value={(table.getColumn(searchValue)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchValue)?.setFilterValue(event.target.value)
          }
          className="max-w-sm" />
        <DropSearch setSearchValue={setSearchValue} values={searchKeys} />
        {refresh !== undefined && <Button onClick={() => setRefresh(!refresh)}><RefreshCw /></Button>}
      </div>

      {loading ? <div className="rounded-md border flex justify-center items-center h-[25rem]"><Loader /></div> : <div className="rounded-md border">
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

      <div className="flex items-center justify-end space-x-2 py-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div >
  );
}

export const DropSearch = ({ currentValue, setSearchValue, values }: DropSearchProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center space-x-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:border-blue-400">
        <span>{currentValue?currentValue:"Filters"}</span>
        <ChevronRight className={`transition-all duration-200 h-5 w-5 ${open && "rotate-90"}`} />
      </button>
      {open && (
        <div className="absolute z-30 left-0 mt-2 w-44 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div >
            {values.map((value, index) => (
              <Button key={index} onClick={() => { setSearchValue(value); setOpen(!open) }} className="block w-full border-b py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">{value}</Button>
            ))}
          </div>
        </div>
      )}
    </div>

  )
}

