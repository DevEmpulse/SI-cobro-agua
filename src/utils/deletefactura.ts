import { db } from "@/db/facturasDB";

export async function deleteFactura(id: number) {
  await db.facturas.delete(id);
}