import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FacturaList } from "@/features/facturas/FacturaList";
import { getFacturasStats } from "@/utils/calculos";
import { formatearImporte } from "@/utils/calculos";
import { Button } from "@/components/ui/button";
import { NotebookPen } from "lucide-react";
import { exportarFacturasDelDia } from "@/features/facturas/exportarFacturas";

export const Balance = () => {
    const [stats, setStats] = useState({
        totalFacturas: 0,
        totalImporte: 0,
        totalComision: 0,
        totalRendicion: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getFacturasStats();
            setStats(data);
        };
        fetchStats();
    }, [stats]);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-slate-800">
                    Balance del día
                </h2>
                <Button
                    onClick={exportarFacturasDelDia}
                    type="submit"
                    className="cursor-pointer bg-green-600 text-white hover:bg-green-800"
                >
                    <NotebookPen className="h-4 w-4" />
                    Realizar Resumen
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
                <Card className="pb-6">
                    <CardHeader>
                        <CardTitle>Total de facturas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.totalFacturas}</p>
                    </CardContent>
                </Card>
                <Card className="pb-6">
                    <CardHeader>
                        <CardTitle>Importe total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            ${formatearImporte(stats.totalImporte)}
                        </p>
                    </CardContent>
                </Card>
                <Card className="pb-6">
                    <CardHeader>
                        <CardTitle>Importe Comisión</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            ${formatearImporte(stats.totalComision)}
                        </p>
                    </CardContent>
                </Card>
                <Card className="pb-6">
                    <CardHeader>
                        <CardTitle>Rendición</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            ${formatearImporte(stats.totalRendicion)}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Facturas del día
            </h2>
            <FacturaList />
        </div>
    );
};
