import type React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReceiptText } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { db } from "@/db/facturasDB";
import type { Factura } from "@/types/factura";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Cambia este import:
import { toast } from "sonner";

// Esquema de validación
const formSchema = z.object({
  numeroFactura: z.string().min(1, {
    message: "El número de factura es requerido.",
  }),
  importe: z.string().min(1, {
    message: "El importe es requerido.",
  }),
});

// Tipo para los valores del formulario
type FormValues = z.infer<typeof formSchema>;

const CargarFactura: React.FC = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numeroFactura: "",
      importe: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const fechaActual = new Date();

    const nuevaFactura = {
      numero: values.numeroFactura,
      importe: parseFloat(values.importe),
      fecha: fechaActual,
    };

    try {
      await db.facturas.add(nuevaFactura);

      toast.success(
        `Factura #${values.numeroFactura} por $${values.importe} ha sido registrada.`
      );

      // También actualizar el estado local para mostrarla sin recargar
      setFacturas([
        ...facturas,
        {
          id: Date.now(), // local para el renderizado (Dexie asigna su propio id)
          numero: nuevaFactura.numero,
          importe: nuevaFactura.importe,
          fecha: fechaActual,
        },
      ]);

      form.reset();
    } catch (error) {
      console.error("Error al guardar la factura:", error);
      toast.error("Ocurrió un error al guardar la factura.");
    }
  }
  useEffect(() => {
    const verFacturas = async () => {
      const todas = await db.facturas.toArray();
      console.log("Facturas guardadas en IndexedDB:", todas);
    };

    verFacturas();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
          Cargar Nueva Factura
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Ingresa los detalles de la factura para registrarla en el sistema
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="numeroFactura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Factura</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: B000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="importe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: 1500.00"
                      type="number"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full md:w-auto cursor-pointer bg-green-600 text-white hover:bg-green-800"
          >
            <ReceiptText className="mr-2 h-4 w-4" />
            Registrar Factura
          </Button>
        </form>
      </Form>

      {facturas.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Facturas Recientes
          </h3>
          <div className="grid gap-4">
            {facturas.map((factura) => (
              <Card key={factura.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Factura #{factura.numero}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {format(factura.fecha, "PPP 'a las' HH:mm", {
                        locale: es,
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${factura.importe}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CargarFactura;
