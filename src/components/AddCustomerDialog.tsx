
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

interface AddCustomerDialogProps {
  onAddCustomer: (customerData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    vehicle: string;
    plateNumber: string;
  }) => void;
}

const AddCustomerDialog = ({ onAddCustomer }: AddCustomerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    vehicle: "",
    plateNumber: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.vehicle && formData.plateNumber) {
      onAddCustomer(formData);
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        vehicle: "",
        plateNumber: ""
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Pelanggan
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-red-600 text-white max-w-md mx-auto">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-xl font-bold">Tambah Pelanggan Baru</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4 space-y-4">
            <div>
              <Label className="text-white text-sm">Nama Lengkap *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nama lengkap pelanggan"
                className="bg-white/20 border-white/30 text-white placeholder-white/70"
                required
              />
            </div>

            <div>
              <Label className="text-white text-sm">Nomor Telepon *</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="08xxxxxxxxxx"
                className="bg-white/20 border-white/30 text-white placeholder-white/70"
                required
              />
            </div>

            <div>
              <Label className="text-white text-sm">Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="email@contoh.com"
                className="bg-white/20 border-white/30 text-white placeholder-white/70"
              />
            </div>

            <div>
              <Label className="text-white text-sm">Alamat</Label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Alamat lengkap"
                className="bg-white/20 border-white/30 text-white placeholder-white/70"
              />
            </div>

            <div>
              <Label className="text-white text-sm">Kendaraan *</Label>
              <Input
                value={formData.vehicle}
                onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                placeholder="Contoh: Honda Vario 125"
                className="bg-white/20 border-white/30 text-white placeholder-white/70"
                required
              />
            </div>

            <div>
              <Label className="text-white text-sm">Nomor Polisi *</Label>
              <Input
                value={formData.plateNumber}
                onChange={(e) => setFormData({...formData, plateNumber: e.target.value})}
                placeholder="Contoh: B 1234 ABC"
                className="bg-white/20 border-white/30 text-white placeholder-white/70"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
            Tambah Pelanggan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerDialog;
