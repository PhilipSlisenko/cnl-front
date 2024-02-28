"use client";

// list of dataset sorted by last edited
// button create dataset

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoggedConversation } from "@/types/loggedConversations";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchConversations } from "./fetchConversations";

export default function LoggedConversationsList() {
  const {
    data: datasets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["logged-conversations"],
    queryFn: fetchConversations,
    // queryFn: mockFetchConversations,
  });

  const [columns, setColumns] = useState<ColumnDef<LoggedConversation>[]>([]);
  useEffect(() => {
    setColumns([
      {
        accessorKey: "conversation_id",
        header: "Conversation id",
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
          return (
            <div className="text-center">
              <Button asChild={true}>
                <Link
                  href={`/logged-conversation?conversationId=${row.original.conversation_id}`}
                >
                  View
                </Link>
              </Button>
            </div>
          );
        },
      },
    ]);
  }, []);

  const table = useReactTable({
    data: datasets || [],
    columns: columns || [],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="space-y-4">
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
              {datasets ? (
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
        {/* Tabulation controls */}
        {datasets && (
          <div className="flex items-center justify-end space-x-2 ">
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
        )}
      </div>
    </>
  );
}
