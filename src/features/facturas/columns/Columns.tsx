import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import type { Factura } from "@/types/factura";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Factura>[] = [
  {
    accessorKey: "numero",
    header: "Factura",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "Importe",
    header: "Importe",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex space-x-2">
          <Button
            className="cursor-pointer"
            variant="destructive"
            size="sm"
            onClick={() => console.log("Borrar", payment.id)}
          >
            Borrar
          </Button>
        </div>
      );
    },
  },
];
