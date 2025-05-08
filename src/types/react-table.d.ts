// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Factura } from "@/types/factura";

declare module "@tanstack/react-table" {
  interface TableMeta {
    removeFactura?: (id: number) => void;
  }
}