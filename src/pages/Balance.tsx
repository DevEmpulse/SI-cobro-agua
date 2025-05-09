import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FacturaList } from "@/features/facturas/FacturaList";
import { getFacturasStats } from "@/utils/calculos";
import { formatearImporte } from "@/utils/calculos";
import { Button } from "@/components/ui/button";
import { NotebookPen, Trash } from "lucide-react";
import { exportarFacturasDelDia } from "@/features/facturas/exportarFacturas";
import { deleteAllFacturas } from "@/utils/deletefactura";
import { ConfirmDeleteModal } from "@/components/ConfirmDeleteModal";
import { toast } from "sonner";



export const Balance = () => {
    const [stats, setStats] = useState({
        totalFacturas: 0,
        totalImporte: 0,
        totalComision: 0,
        totalRendicion: 0,
    });
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [open, setOpen] = useState(false);

    const actualizarDatos = async () => {
        const data = await getFacturasStats();
        setStats(data);
        setUpdateTrigger(prev => prev + 1);
    };

    useEffect(() => {
        actualizarDatos();
    }, []);

    const handleDeleteAll = async () => {
        await deleteAllFacturas();
        await actualizarDatos();
        setOpen(false);
        toast.success("Todas las facturas han sido borradas");
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-4 gap-2">
                <h2 className="text-2xl font-semibold text-slate-800">
                    Balance del día
                </h2>
                <Button
                    onClick={() => {
                        if (stats.totalFacturas > 0) {
                            setOpen(true);
                        } else {
                            toast.error("No hay facturas para borrar");
                        }
                    }}
                    type="submit"
                    className="cursor-pointer bg-red-600 text-white hover:bg-red-800"
                >
                    <Trash className="h-4 w-4" />
                    Borrar todas las facturas
                </Button>
                <ConfirmDeleteModal
                    description="todas las facturas"
                    open={open}
                    onOpenChange={setOpen}
                    onConfirm={handleDeleteAll}
                />
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

            <h2 className="text-2xl font-semibold text-slate-800">
                Facturas del día
            </h2>
            <FacturaList key={updateTrigger} onFacturaChange={actualizarDatos} />
        </div>
    );
};
