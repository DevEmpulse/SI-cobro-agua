import { Button } from "@/components/ui/button"
import { type ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: number
    numeroFactura: string
    monto: string
    fecha: Date
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "numeroFactura",
        header: "Factura",
    },
    {
        accessorKey: "fecha",
        header: "Fecha"
    },
    {
        accessorKey: "monto",
        header: "Monto",
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
                Borrar
              </Button>
            </div>
          )
        },
    }
]