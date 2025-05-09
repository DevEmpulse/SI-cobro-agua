import { ActionsCell } from "@/components/ActionsCell";
import { db } from "@/db/facturasDB";
import type { Factura } from "@/types/factura";
import type { ColumnDef } from "@tanstack/table-core";
import { format } from "date-fns";
import { es } from "date-fns/locale";



export const columns: ColumnDef<Factura>[] = [
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "numero",
    header: "Factura",
  },
  {
    accessorKey: "fecha",
    header: "Fecha",
    cell: ({ row }: { row: { original: Factura } }) => {
      const fecha = row.original.fecha;
      return fecha
        ? format(fecha, "dd/MM/yyyy HH:mm", { locale: es })
        : "Sin fecha";
    },
  },
  {
    accessorKey: "importe",
    header: "Importe",
  },
  {
    id: "actions",
    cell: ({ row, table }) => (
      <ActionsCell
        description="la factura"
        payment={row.original}
        onDelete={async () => {
          const id = row.original.id;
          if (id !== undefined) {
            await db.facturas.delete(row.original.id);
            table.options.meta?.removeFactura?.(id);
          }
        }}
      />
    ),
  },
];
