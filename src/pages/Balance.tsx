import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FacturaList } from "@/features/facturas/FacturaList"
export const Balance = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Balance del dia</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8"> 
                <Card className="pb-6">
                    <CardHeader>
                        <CardTitle>Total de facturas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">10</p>
                    </CardContent>
                </Card>
                <Card className="pb-6">
                <CardHeader>
                        <CardTitle>Importe total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">$1000</p>
                    </CardContent>
                </Card>
                <Card className="pb-6">
                    <CardHeader>
                        <CardTitle>Importe Comisión</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">$1000</p>
                    </CardContent>
                </Card>
                <Card className="pb-6">
                    <CardHeader>
                        <CardTitle>Rendición</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">$1000</p>
                    </CardContent>
                </Card>
            </div>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Facturas del dia</h2>
            <FacturaList />
        </div>
    )
}
