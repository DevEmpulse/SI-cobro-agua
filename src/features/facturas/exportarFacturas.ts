import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { db } from "@/db/facturasDB";
import { getFacturasStats } from "@/utils/calculos";
import { toast } from "sonner";

interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable: {
    finalY: number;
  };
}

export const exportarFacturasDelDia = async () => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);
  const fechaFormateada = hoy.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const facturasDelDia = await db.facturas
    .filter((f) => {
      const fecha = new Date(f.fecha);
      return fecha >= hoy && fecha < mañana;
    })
    .toArray();

  if (facturasDelDia.length === 0) {
    toast.error("No hay facturas del día.");
    return;
  }

  const stats = await getFacturasStats();

  const doc = new jsPDF() as jsPDFWithAutoTable;
  doc.text(`Facturas del Día - ${fechaFormateada}`, 14, 20);

  const rows = facturasDelDia.map((f) => [
    f.id ?? "",
    f.numero ?? "",
    f.importe !== undefined ? `$${f.importe.toFixed(2)}` : "",
    f.fecha ? new Date(f.fecha).toLocaleString("es-AR") : "",
  ]);

  autoTable(doc, {
    head: [["ID", "Nº Factura", "Importe", "Fecha"]],
    body: rows,
    startY: 30,
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  // Título "Resumen del Día"
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Resumen del Día", 14, finalY);

  // Datos en detalle
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  const resumen = [
    [`Total de Facturas`, `${stats.totalFacturas}`],
    [`Importe Total`, `$${stats.totalImporte.toFixed(2)}`],
    [`Comisión (2%)`, `$${stats.totalComision.toFixed(2)}`],
    [`Rendición`, `$${stats.totalRendicion.toFixed(2)}`],
  ];

  // Dibujar los datos como una pequeña tabla alineada
  resumen.forEach(([label, value], index) => {
    const y = finalY + 10 + index * 8;
    doc.text(label, 14, y);
    doc.text(value, 80, y, { align: "right" });
  });

  doc.save("facturas-del-dia.pdf");
};
