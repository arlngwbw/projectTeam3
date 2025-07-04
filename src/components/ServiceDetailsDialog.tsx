
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceDetailsDialogProps {
  children: React.ReactNode;
}

const ServiceDetailsDialog = ({ children }: ServiceDetailsDialogProps) => {
  const activeServices = [
    {
      plateNumber: "B 1234 ABC",
      customerName: "Ahmad Suparman",
      serviceType: "Ganti Oli",
      mechanic: "Budi",
      status: "Diproses"
    },
    {
      plateNumber: "B 5678 DEF",
      customerName: "Siti Rahayu", 
      serviceType: "Tune Up",
      mechanic: "Juli",
      status: "Diproses"
    },
    {
      plateNumber: "B 9012 GHI",
      customerName: "Dedi Kurniawan",
      serviceType: "Service Rem",
      mechanic: "Hakim",
      status: "Diproses"
    },
    {
      plateNumber: "B 3456 JKL",
      customerName: "Maya Dewi",
      serviceType: "Ganti Ban",
      mechanic: "Adela",
      status: "Diproses"
    },
    {
      plateNumber: "B 7890 MNO",
      customerName: "Andi Wijaya",
      serviceType: "Servis Berkala",
      mechanic: "Fadzril",
      status: "Diproses"
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Kendaraan yang Sedang Diservice</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {activeServices.map((service, index) => (
            <Card key={index} className="bg-gray-50">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{service.plateNumber}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{service.status}</span>
                  </div>
                  <p className="text-sm text-gray-600">{service.customerName}</p>
                  <p className="text-sm text-gray-600">{service.serviceType}</p>
                  <p className="text-sm text-red-600 font-medium">Mekanik: {service.mechanic}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailsDialog;
