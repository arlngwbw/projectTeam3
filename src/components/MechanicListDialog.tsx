
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MechanicListDialogProps {
  children: React.ReactNode;
}

const MechanicListDialog = ({ children }: MechanicListDialogProps) => {
  const mechanics = [
    { name: "Budi", status: "Aktif", currentJob: "Ganti Oli - B 1234 ABC" },
    { name: "Andi", status: "Istirahat", currentJob: "-" },
    { name: "Caca", status: "Istirahat", currentJob: "-" },
    { name: "Dedi", status: "Istirahat", currentJob: "-" },
    { name: "Juli", status: "Aktif", currentJob: "Tune Up - B 5678 DEF" },
    { name: "Hakim", status: "Aktif", currentJob: "Service Rem - B 9012 GHI" },
    { name: "Adela", status: "Aktif", currentJob: "Ganti Ban - B 3456 JKL" },
    { name: "Fadzril", status: "Aktif", currentJob: "Servis Berkala - B 7890 MNO" }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white max-w-md mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Daftar Mekanik</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {mechanics.map((mechanic, index) => (
            <Card key={index} className="bg-gray-50">
              <CardContent className="p-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{mechanic.name}</span>
                    <Badge className={mechanic.status === "Aktif" ? "bg-green-500" : "bg-gray-500"}>
                      {mechanic.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {mechanic.status === "Aktif" ? `Sedang: ${mechanic.currentJob}` : "Tidak ada pekerjaan"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MechanicListDialog;
