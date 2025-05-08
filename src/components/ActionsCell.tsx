import { useState } from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import type { Factura } from "@/types/factura";


export function ActionsCell({ payment, onDelete }: { payment: Factura; onDelete: () => void }) {
    const [open, setOpen] = useState(false);
  
    return (
      <div className="flex space-x-2">
        <Button
          className="cursor-pointer"
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
          Borrar
        </Button>
        <ConfirmDeleteModal
          open={open}
          onOpenChange={setOpen}
          facturaNumero={payment.numero}
          onConfirm={onDelete}
        />
      </div>
    );
  }