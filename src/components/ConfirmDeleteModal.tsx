import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { forwardRef } from "react"

interface ConfirmDeleteModalProps {
  open: boolean
  description: string
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  facturaNumero?: string | number
}

export const ConfirmDeleteModal = forwardRef<HTMLDivElement, ConfirmDeleteModalProps>(({
  open,
  description,
  onOpenChange,
  onConfirm,
  facturaNumero
}, ref) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent ref={ref}>
      <DialogTitle>¿Estás seguro?</DialogTitle>
      <DialogDescription>
        ¿Deseas borrar <b>{description}</b><b>{facturaNumero}</b>?
      </DialogDescription>
      <DialogFooter>
        <Button 
          className="cursor-pointer"
          variant="outline" 
          onClick={() => onOpenChange(false)}
        >
          Cancelar
        </Button>
        <Button
          className="cursor-pointer"
          variant="destructive"
          onClick={() => {
            onConfirm();
            onOpenChange(false);
          }}
        >
          Sí, borrar
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
))