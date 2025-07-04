import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Settings, CheckCircle } from "lucide-react";
import AddQueueDialog from "./AddQueueDialog";
import EditServiceDialog from "./EditServiceDialog";

const ServiceQueue = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      plateNumber: "B 1234 ABC",
      customerName: "Ahmad Suparman",
      serviceType: "Ganti Oli",
      status: "Menunggu",
      estimatedTime: "30 menit",
      mechanic: "Budi"
    },
    {
      id: 2,
      plateNumber: "B 5678 DEF", 
      customerName: "Siti Rahayu",
      serviceType: "Tune Up",
      status: "Diproses",
      estimatedTime: "60 menit",
      mechanic: "Juli"
    },
    {
      id: 3,
      plateNumber: "B 9101 GHI",
      customerName: "Dedi Kurniawan",
      serviceType: "Servis Berkala",
      status: "Selesai",
      estimatedTime: "90 menit",
      mechanic: "Hakim"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Menunggu":
        return "bg-yellow-500";
      case "Diproses":
        return "bg-blue-500";
      case "Selesai":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const updateServiceStatus = (id: number, newStatus: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, status: newStatus } : service
    ));
  };

  const updateService = (serviceId: number, updates: any) => {
    setServices(services.map(service => 
      service.id === serviceId ? { ...service, ...updates } : service
    ));
  };

  const addNewQueue = (queueData: {
    plateNumber: string;
    customerName: string;
    vehicleType: string;
    vehicleBrand: string;
    serviceType: string;
    mechanic: string;
    date: string;
    time: string;
    notes: string;
  }) => {
    const estimatedTimes: Record<string, string> = {
      "Ganti Oli": "30 menit",
      "Tune Up": "60 menit",
      "Servis Berkala": "90 menit",
      "Ganti Ban": "45 menit",
      "Service Rem": "40 menit"
    };

    const newService = {
      id: Date.now(),
      plateNumber: queueData.plateNumber,
      customerName: queueData.customerName,
      serviceType: queueData.serviceType,
      status: "Menunggu",
      estimatedTime: estimatedTimes[queueData.serviceType] || "60 menit",
      mechanic: queueData.mechanic
    };

    setServices([...services, newService]);
  };

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Antrian Servis</h2>
        <AddQueueDialog onAddQueue={addNewQueue} />
      </div>

      {services.map((service) => (
        <Card key={service.id} className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-gray-800">
                {service.plateNumber}
              </CardTitle>
              <Badge className={`${getStatusColor(service.status)} text-white`}>
                {service.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{service.customerName}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{service.serviceType}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">Est. {service.estimatedTime}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">Mekanik: {service.mechanic}</span>
            </div>

            <div className="flex space-x-2 pt-2">
              {service.status === "Menunggu" && (
                <Button 
                  size="sm" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => updateServiceStatus(service.id, "Diproses")}
                >
                  Mulai Servis
                </Button>
              )}
              
              {service.status === "Diproses" && (
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => updateServiceStatus(service.id, "Selesai")}
                >
                  Selesai
                </Button>
              )}
              
              {service.status === "Selesai" && (
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Buat Invoice
                </Button>
              )}
              
              <EditServiceDialog 
                service={service} 
                onUpdateService={updateService}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceQueue;
