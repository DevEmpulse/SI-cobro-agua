import { DataTable } from "@/components/DataTable/DataTable"
import { columns } from "./columns/Columns"



export const FacturaList = () => {
    // Facturas de prueba
   
    return (
        <div className="container mx-auto py-10">
        <DataTable columns={columns} data={[]} />
      </div>
    )
}
