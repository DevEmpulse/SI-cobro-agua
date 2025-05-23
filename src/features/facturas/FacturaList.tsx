import { DataTable } from "@/components/DataTable/DataTable"
import { columns } from "./columns/Columns"
import { useEffect, useState } from "react";
import { db } from "@/db/facturasDB";

import type { Factura } from "@/types/factura";



export const FacturaList = ({ onFacturaChange }: { onFacturaChange: () => void }) => {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  useEffect(() => {
    const getFacturas = async () => {
      const data = await db.facturas.toArray();
      setFacturas(data);
    };

    getFacturas();
  }, []);

  const removeFactura = async (id: number) => {
    
    await db.facturas.delete(id);
    setFacturas((prev) => prev.filter(f => f.id !== id));
   
    if (onFacturaChange) {
      onFacturaChange();
    }
  };

  return (
    <div className="container mx-auto py-7">
      <DataTable columns={columns} data={facturas} meta={{ removeFactura }} />
    </div>
  )
}
