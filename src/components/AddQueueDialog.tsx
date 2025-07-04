
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Plus } from "lucide-react";

interface AddQueueDialogProps {
  onAddQueue: (queueData: {
    plateNumber: string;
    customerName: string;
    vehicleType: string;
    vehicleBrand: string;
    serviceType: string;
    mechanic: string;
    date: string;
    time: string;
    notes: string;
  }) => void;
}

const AddQueueDialog = ({ onAddQueue }: AddQueueDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    plateNumber: "",
    customerName: "",
    vehicleType: "",
    vehicleBrand: "",
    serviceType: "",
    mechanic: "",
    date: "",
    time: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.plateNumber && formData.customerName && formData.vehicleType && 
        formData.vehicleBrand && formData.serviceType && formData.mechanic && 
        formData.date && formData.time) {
      onAddQueue(formData);
      setFormData({
        plateNumber: "",
        customerName: "",
        vehicleType: "",
        vehicleBrand: "",
        serviceType: "",
        mechanic: "",
        date: "",
        time: "",
        notes: ""
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Antrian
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-red-600 text-white max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center mb-4">
          <div className="flex items-center justify-center mb-2">
            <CalendarDays className="w-6 h-6 mr-2" />
            <DialogTitle className="text-xl font-bold">Booking Service</DialogTitle>
          </div>
          <p className="text-red-100 text-sm">Jadwalkan service kendaraan Anda</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white/10 rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-2 text-sm">🚗</div>
              Informasi Kendaraan
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white text-sm">Jenis Kendaraan *</Label>
                <Select onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Pilih jenis kendaraan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Motor">Motor</SelectItem>
                    <SelectItem value="Mobil">Mobil</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-white text-sm">Merk Kendaraan *</Label>
                <Input
                  value={formData.vehicleBrand}
                  onChange={(e) => setFormData({...formData, vehicleBrand: e.target.value})}
                  placeholder="Contoh: Honda, Yamaha, Toyota"
                  className="bg-white/20 border-white/30 text-white placeholder-white/70"
                  required
                />
              </div>
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

            <div>
              <Label className="text-white text-sm">Nama Pelanggan *</Label>
              <Input
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                placeholder="Nama pelanggan"
                className="bg-white/20 border-white/30 text-white placeholder-white/70"
                required
              />
            </div>

            <div>
              <Label className="text-white text-sm">Jenis Service *</Label>
              <Select onValueChange={(value) => setFormData({...formData, serviceType: value})}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Pilih jenis service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ganti Oli">Ganti Oli</SelectItem>
                  <SelectItem value="Tune Up">Tune Up</SelectItem>
                  <SelectItem value="Servis Berkala">Servis Berkala</SelectItem>
                  <SelectItem value="Ganti Ban">Ganti Ban</SelectItem>
                  <SelectItem value="Service Rem">Service Rem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-2 text-sm">⏰</div>
              Jadwal Service
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white text-sm">Tanggal *</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="bg-white/20 border-white/30 text-white"
                  required
                />
              </div>
              
              <div>
                <Label className="text-white text-sm">Waktu *</Label>
                <Select onValueChange={(value) => setFormData({...formData, time: value})}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Pilih waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00</SelectItem>
                    <SelectItem value="09:00">09:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="11:00">11:00</SelectItem>
                    <SelectItem value="13:00">13:00</SelectItem>
                    <SelectItem value="14:00">14:00</SelectItem>
                    <SelectItem value="15:00">15:00</SelectItem>
                    <SelectItem value="16:00">16:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-white text-sm">Mekanik</Label>
              <Select onValueChange={(value) => setFormData({...formData, mechanic: value})}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Pilih mekanik" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Budi">Budi</SelectItem>
                  <SelectItem value="Andi">Andi</SelectItem>
                  <SelectItem value="Caca">Caca</SelectItem>
                  <SelectItem value="Dedi">Dedi</SelectItem>
                  <SelectItem value="Juli">Juli</SelectItem>
                  <SelectItem value="Hakim">Hakim</SelectItem>
                  <SelectItem value="Adela">Adela</SelectItem>
                  <SelectItem value="Fadzril">Fadzril</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-white text-sm">Keluhan/Catatan</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Jelaskan keluhan atau permintaan khusus..."
                className="bg-white/20 border-white/30 text-white placeholder-white/70 min-h-[80px]"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3">
            Konfirmasi Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQueueDialog;
