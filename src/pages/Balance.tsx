import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { FacturaList } from "@/features/facturas/FacturaList";
import { getFacturasStats } from "@/utils/calculos";
import { formatearImporte } from "@/utils/calculos";

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
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">
        Balance del día
      </h2>
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
