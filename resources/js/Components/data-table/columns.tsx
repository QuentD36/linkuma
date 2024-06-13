"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/Components/ui/badge"
import { Checkbox } from "@/Components/ui/checkbox"

import { DataTableColumnHeader } from "@/Components/data-table/data-table-column-header"
// import { DataTableRowActions } from "@/Components/data-table/data-table-row-actions"
import { statuses } from "@/Components/data-table/data/statuses"
import { Url } from "@/types"

export const columns: ColumnDef<Url>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "url",
    accessorKey: "URL",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Url" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.original.url}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div>
          {status.render()}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]