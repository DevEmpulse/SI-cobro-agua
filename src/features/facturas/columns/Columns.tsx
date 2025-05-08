import { Button } from "@/components/ui/button"
import type { Factura } from "@/types/factura"
import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Trash } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: number
    numeroFactura: string
    monto: string
    fecha: Date
}

export const columns: ColumnDef<Factura>[] = [
    {
        accessorKey: "numero",
        header: "Factura",
    },
    {
        accessorKey: "fecha",
        header: "Fecha",
        cell: ({ row }) => {
            const fecha = row.original.fecha;
            return fecha
                ? format(fecha, "dd/MM/yyyy HH:mm", { locale: es })
                : "Sin fecha";
        }
    },
    {
        accessorKey: "importe",
        header: "Importe",
    },      
    {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original
    
          return (
            <div className="flex space-x-2">
             
              <Button
                className="cursor-pointer"
                variant="destructive"
                size="sm"
                onClick={() => console.log("Borrar", payment.id)} // Aquí va tu lógica de borrar
              >
                <Trash className="h-4 w-4" />
                Borrar
              </Button>
            </div>
          )
        },
    }
]