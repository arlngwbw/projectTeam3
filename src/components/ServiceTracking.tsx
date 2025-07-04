
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Clock, CheckCircle2, AlertCircle, Wrench } from "lucide-react";

const ServiceTracking = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);

  const sampleTrackingData = {
    plateNumber: "B 1234 ABC",
    customerName: "Ahmad Suparman",
    phoneNumber: "08123456789",
    vehicleType: "Honda Vario 150",
    serviceType: "Servis Berkala 10.000 KM",
    status: "Diproses",
    progress: [
      { step: "Kendaraan Diterima", completed: true, time: "08:30" },
      { step: "Pemeriksaan Awal", completed: true, time: "09:00" },
      { step: "Ganti Oli Mesin", completed: true, time: "09:30" },
      { step: "Tune Up Mesin", completed: false, time: "10:00" },
      { step: "Pemeriksaan Akhir", completed: false, time: "10:30" },
      { step: "Siap Diambil", completed: false, time: "11:00" }
    ],
    estimatedCompletion: "11:00",
    mechanicName: "Budi Santoso",
    totalCost: 250000,
    notes: "Perlu penggantian filter udara (opsional)"
  };

  const handleTrackService = () => {
    if (plateNumber.trim()) {
      // Simulate API call
      setTrackingResult(sampleTrackingData);
    }
  };

  const getProgressIcon = (completed: boolean, isNext: boolean) => {
    if (completed) {
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    } else if (isNext) {
      return <Wrench className="w-5 h-5 text-blue-600 animate-pulse" />;
    } else {
      return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold text-white">Pelacakan Servis</h2>

      {/* Search Section */}
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-800">
            <Search className="w-5 h-5 mr-2" />
            Lacak Kendaraan Anda
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Masukkan nomor polisi (contoh: B 1234 ABC)"
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleTrackService}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Lacak
            </Button>
          </div>
          
          <p className="text-sm text-gray-600">
            Masukkan nomor polisi kendaraan untuk melihat status servis terkini
          </p>
        </CardContent>
      </Card>

      {/* Tracking Results */}
      {trackingResult && (
        <div className="space-y-4">
          {/* Vehicle Info */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-800">{trackingResult.plateNumber}</CardTitle>
                <Badge className="bg-blue-600 text-white">
                  {trackingResult.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Pemilik</p>
                  <p className="font-medium">{trackingResult.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Telepon</p>
                  <p className="font-medium">{trackingResult.phoneNumber}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Kendaraan</p>
                  <p className="font-medium">{trackingResult.vehicleType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jenis Servis</p>
                  <p className="font-medium">{trackingResult.serviceType}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Mekanik</p>
                  <p className="font-medium">{trackingResult.mechanicName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimasi Selesai</p>
                  <p className="font-medium text-blue-600">{trackingResult.estimatedCompletion}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Tracking */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Progress Servis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trackingResult.progress.map((step, index) => {
                  const isNext = !step.completed && index > 0 && trackingResult.progress[index - 1].completed;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {getProgressIcon(step.completed, isNext)}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${step.completed ? 'text-green-700' : isNext ? 'text-blue-700' : 'text-gray-500'}`}>
                          {step.step}
                        </p>
                        <p className={`text-sm ${step.completed ? 'text-green-600' : 'text-gray-400'}`}>
                          {step.completed ? `Selesai ${step.time}` : `Estimasi ${step.time}`}
                        </p>
                      </div>
                      {step.completed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Selesai
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Catatan Tambahan</p>
                  <p className="text-gray-600 text-sm mt-1">{trackingResult.notes}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Estimasi Total Biaya:</span>
                  <span className="font-bold text-xl text-blue-600">
                    Rp {trackingResult.totalCost.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              Hubungi Bengkel
            </Button>
            <Button variant="outline" className="flex-1">
              Refresh Status
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTracking;
