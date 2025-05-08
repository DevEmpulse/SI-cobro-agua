import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { db } from "@/db/facturasDB";
import type { Factura } from "@/types/factura";
import { useEffect } from "react";
import { FacturaList } from "@/features/facturas/FacturaList"
import { useState } from "react";




export const Balance = () => {

    const [facturas, setFacturas] = useState<Factura[]>([]);
    useEffect(() => {
        const getFacturas = async () => {
            const data = await db.facturas.toArray();
            setFacturas(data);
        };
        getFacturas();
    }, []);

    const totalFacturas = facturas.length;
    const totalImporte = facturas.reduce((acc, factura) => acc + factura.importe, 0);
    const totalComision = parseFloat((totalImporte * 0.02).toFixed(2));
    const totalRendicion = parseFloat((totalImporte - totalComision).toFixed(2));

    
    return (
        <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Balance del dia</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8"> 
                <Card className="pb-6">
                    <CardHeader>
                        <CardTitle>Total de facturas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{totalFacturas}</p>
                    </CardContent>
                </Card>
                <Card className="pb-6">
                <CardHeader>
                        <CardTitle>Importe total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">${totalImporte}</p>
                    </CardContent>
                </Card>
                <Card className="pb-6">
                    <CardHeader>
                        <CardTitle>Importe Comisión</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">${totalComision}</p>
                    </CardContent>
                </Card>
                <Card className="pb-6">
                    <CardHeader>
                        <CardTitle>Rendición</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">${totalRendicion}</p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Facturas del dia</h2>
            <FacturaList />
        </div>
    )
}
