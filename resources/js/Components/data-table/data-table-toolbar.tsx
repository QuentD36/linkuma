import { Table } from "@tanstack/react-table"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"

import { DataTableFacetedFilter } from "@/Components/data-table/data-table-faceted-filter"
import { Check, CircleAlert, Copy, Loader, Plus, X } from "lucide-react"
import { statuses } from "@/Components/data-table/data/statuses"
import { useState } from "react"
import AddUrls from "@/Components/AddUrls"
import { Url } from "@/types"

interface DataTableToolbarProps {
  table: Table<Url>;
  add: boolean;
}


export function DataTableToolbar<TData>({
  table,
  add,
}: DataTableToolbarProps) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [open, setOpen] = useState(false)
  const handleCopy = () => {
    const failedRows = table.getCoreRowModel().rows.map(row => row.original).filter(row => row.status === 'failed' || row.status === 'error');

    const urlsToCopy = failedRows.map(row => row.url).join('\n');

    navigator.clipboard.writeText(urlsToCopy)
        .then(() => {
            console.log('URLs copiées avec succès !');
        })
        .catch(err => {
            console.error('Erreur lors de la copie des URLs : ', err);
        });
  };



  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter urls..."
          value={(table.getColumn("url")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {
        add ?
          (
            <>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto hidden h-8 lg:flex"
                onClick={() => setOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add URL(s)
              </Button>
              <AddUrls open={open} setOpen={setOpen} />
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
              onClick={handleCopy}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy not indexed
            </Button>
          )
      }

    </div>
  )
}