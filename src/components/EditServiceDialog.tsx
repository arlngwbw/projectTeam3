
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Trash2 } from "lucide-react";

interface SparePart {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface EditServiceDialogProps {
  service: {
    id: number;
    plateNumber: string;
    customerName: string;
    serviceType: string;
    mechanic: string;
    status: string;
  };
  onUpdateService: (serviceId: number, updates: any) => void;
}

const EditServiceDialog = ({ service, onUpdateService }: EditServiceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [newPart, setNewPart] = useState({ name: "", qty: 1, price: 0 });
  const [notes, setNotes] = useState("");

  const availableParts = [
    "Oli Mesin", "Filter Oli", "Busi", "Kampas Rem", "Ban", "Rantai", 
    "Sprocket", "Filter Udara", "Aki", "Lampu"
  ];

  const addSparePart = () => {
    if (newPart.name && newPart.qty > 0 && newPart.price > 0) {
      const part: SparePart = {
        id: Date.now().toString(),
        name: newPart.name,
        qty: newPart.qty,
        price: newPart.price
      };
      setSpareParts([...spareParts, part]);
      setNewPart({ name: "", qty: 1, price: 0 });
    }
  };

  const removeSparePart = (id: string) => {
    setSpareParts(spareParts.filter(part => part.id !== id));
  };

  const handleSave = () => {
    const updates = {
      spareParts,
      notes,
      totalSparePartCost: spareParts.reduce((total, part) => total + (part.qty * part.price), 0)
    };
    onUpdateService(service.id, updates);
    setOpen(false);
  };

  const totalCost = spareParts.reduce((total, part) => total + (part.qty * part.price), 0);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Edit Service - {service.plateNumber}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Pelanggan: <span className="font-medium">{service.customerName}</span></p>
            <p className="text-sm text-gray-600">Service: <span className="font-medium">{service.serviceType}</span></p>
            <p className="text-sm text-gray-600">Mekanik: <span className="font-medium">{service.mechanic}</span></p>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Tambah Sparepart</Label>
            <div className="space-y-3 mt-2">
              <Select onValueChange={(value) => setNewPart({...newPart, name: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih sparepart" />
                </SelectTrigger>
                <SelectContent>
                  {availableParts.map((part) => (
                    <SelectItem key={part} value={part}>{part}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-sm">Qty</Label>
                  <Input
                    type="number"
                    value={newPart.qty}
                    onChange={(e) => setNewPart({...newPart, qty: parseInt(e.target.value) || 1})}
                    min="1"
                  />
                </div>
                <div>
                  <Label className="text-sm">Harga (Rp)</Label>
                  <Input
                    type="number"
                    value={newPart.price}
                    onChange={(e) => setNewPart({...newPart, price: parseInt(e.target.value) || 0})}
                    min="0"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    type="button" 
                    onClick={addSparePart}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {spareParts.length > 0 && (
            <div>
              <Label className="text-gray-700 font-medium">Sparepart yang Ditambahkan</Label>
              <div className="space-y-2 mt-2">
                {spareParts.map((part) => (
                  <div key={part.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <p className="font-medium">{part.name}</p>
                      <p className="text-sm text-gray-600">
                        {part.qty} x Rp {part.price.toLocaleString()} = Rp {(part.qty * part.price).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeSparePart(part.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="text-right font-semibold text-green-600">
                  Total Sparepart: Rp {totalCost.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          <div>
            <Label className="text-gray-700 font-medium">Catatan Tambahan</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan untuk service ini..."
              className="mt-2"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Simpan Perubahan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditServiceDialog;
