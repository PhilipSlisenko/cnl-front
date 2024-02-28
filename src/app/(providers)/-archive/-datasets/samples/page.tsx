"use client";

// download dataset button
// new sample button - button with modal
// each sample is button with modal

import {
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { mockFetchSamples } from "./fetchSamples";

import { DatasetSample } from "@/components/datasetsSamples/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DownloadSamplesButton from "./downloadSamplesButton";
import NewSampleButton from "./newSampleButton";
import ViewSampleButton from "./viewSampleButton";

export default function Page({
  searchParams,
}: {
  searchParams: { datasetId: string };
}) {
  const { datasetId } = searchParams;

  const {
    data: samples,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["samples", { datasetId }],
    queryFn: mockFetchSamples,
  });

  const [columns, setColumns] = useState<ColumnDef<DatasetSample>[]>([]);
  useEffect(() => {
    setColumns([
      {
        accessorKey: "sample_id",
        header: "Sample id",
      },
      {
        accessorKey: "last_activity",
        header: "Last activity",
        cell: ({ getValue }) => {
          return new Date(getValue() as string).toLocaleString(undefined, {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }); // setting up columns in useEffect because of this: toLocaleString returns different result on client render and during server render - hence hydration error
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          // Action for viewing details, similar to the payment example
          return (
            <div className="text-center">
              {/* Replace with your actual button component and onClick handler */}
              <ViewSampleButton
                datasetId={datasetId}
                sampleId={row.original.sample_id}
              />
            </div>
          );
        },
      },
    ]);
  }, []);

  const table = useReactTable({
    data: samples || [],
    columns: columns || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-4">
        <div className="flex justify-end gap-4">
          <DownloadSamplesButton />
          <NewSampleButton />
        </div>
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
                    Loading...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="size-5" />
          </Button>
          <p>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </p>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="size-5" />
          </Button>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
