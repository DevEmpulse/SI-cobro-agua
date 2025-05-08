import { db } from "@/db/facturasDB";

export const getAllFacturas = async () => {
  return await db.facturas.toArray();
};

export const getFacturasStats = async () => {
  const facturas = await getAllFacturas();

  const totalImporte = facturas.reduce((acc, f) => acc + (f.importe ?? 0), 0);
  const totalComision = parseFloat((totalImporte * 0.02).toFixed(2));
  const totalRendicion = parseFloat((totalImporte - totalComision).toFixed(2));

  return {
    totalFacturas: facturas.length,
    totalImporte,
    totalComision,
    totalRendicion,
  };
};

export const formatearImporte = (importe: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(importe)
    .replace("$", "")
    .trim();
};
