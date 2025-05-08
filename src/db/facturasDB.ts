import Dexie from "dexie";
import type { Table } from "dexie";
import type { Factura } from "@/types/factura";

export class FacturasDB extends Dexie {
  facturas!: Table<Factura>;

  constructor() {
    super("facturasDB");
    this.version(1).stores({
      facturas: "++id, numero, importe, fecha",
    });
  }
}

export const db = new FacturasDB();
