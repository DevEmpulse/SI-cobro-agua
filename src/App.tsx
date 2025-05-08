
import { Toaster } from 'sonner'
import './App.css'
import Header from './components/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import CargarFactura from './pages/Home'
import { Balance } from './pages/Balance'

function App() {

  return (
    <>
    <Toaster />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <Header
          title="Sistema de Gestión de Facturas"
          subtitle=""
        />
         <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <Tabs defaultValue="cargar" className="w-full">
            <div className="border-b border-slate-200 dark:border-slate-700">
              <TabsList className="w-full justify-start bg-transparent p-0">
                <TabsTrigger
                  value="cargar"
                  className="data-[state=active]:bg-white rounded-t-lg py-3 px-6 text-base font-medium cursor-pointer"
                > 
                  Cargar Facturas
                </TabsTrigger>
                <TabsTrigger
                  value="balance"
                  className="data-[state=active]:bg-white rounded-t-lg py-3 px-6 text-base font-medium cursor-pointer"
                >
                  Balance
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="cargar" className="p-6">
              <CargarFactura />
            </TabsContent>
            <TabsContent value="balance" className="p-6">
              <Balance />
            </TabsContent>
          </Tabs>
        </div>
       </div>
      </div>
    </>
  )
}

export default App
