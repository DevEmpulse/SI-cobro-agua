import type React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ReceiptText } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"


import { toast } from "sonner"

interface Factura {
  id: number
  numeroFactura: string
  monto: string
  fecha: Date
}

// Esquema de validación
const formSchema = z.object({
  numeroFactura: z.string().min(1, {
    message: "El número de factura es requerido.",
  }),
  monto: z.string().min(1, {
    message: "El monto es requerido.",
  }),
})

// Tipo para los valores del formulario
type FormValues = z.infer<typeof formSchema>

const CargarFactura: React.FC = () => {
  const [facturas, setFacturas] = useState<Factura[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numeroFactura: "",
      monto: "",
    },
  })

  function onSubmit(values: FormValues) {
    // Crear factura con la fecha y hora actual
    const nuevaFactura: Factura = {
      id: Date.now(),
      numeroFactura: values.numeroFactura,
      monto: values.monto,
      fecha: new Date(), // Fecha y hora actual
    }

    setFacturas([...facturas, nuevaFactura])
    form.reset({
      numeroFactura: "",
      monto: "",
    })

    toast.success(`Factura #${values.numeroFactura} por $${values.monto} ha sido registrada.`);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Cargar Nueva Factura</h2>
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
              name="monto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: 1500.00" type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full md:w-auto cursor-pointer bg-green-600 text-white hover:bg-green-800">
            <ReceiptText className="mr-2 h-4 w-4" />
            Registrar Factura
          </Button>
        </form>
      </Form>

      {facturas.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">Facturas Recientes</h3>
          <div className="grid gap-4">
            {facturas.map((factura) => (
              <Card key={factura.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Factura #{factura.numeroFactura}</p>
                    <p className="text-sm text-slate-500 ">
                      {format(factura.fecha, "PPP 'a las' HH:mm", { locale: es })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${factura.monto}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CargarFactura