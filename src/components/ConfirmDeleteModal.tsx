import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmDeleteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  facturaNumero?: string | number
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
  facturaNumero
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogTitle>¿Estás seguro?</DialogTitle>
      <DialogDescription>
      ¿Deseas borrar la factura <b>#{facturaNumero}</b>?
      </DialogDescription>
      <DialogFooter>
        <Button 
        className="cursor-pointer"
        variant="outline" onClick={() => onOpenChange(false)}>
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
)