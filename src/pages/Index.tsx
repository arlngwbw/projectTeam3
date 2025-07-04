import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Wrench, 
  Package, 
  Calendar,
  TrendingUp,
  User,
  Home,
  ClipboardList
} from "lucide-react";
import ServiceQueue from "@/components/ServiceQueue";
import SpareParts from "@/components/SpareParts";
import ServiceTracking from "@/components/ServiceTracking";
import Account from "@/components/Account";
import CustomerList from "@/components/CustomerList";
import Reports from "@/components/Reports";
import Invoice from "@/components/Invoice";
import Login from "@/components/Login";
import ServiceDetailsDialog from "@/components/ServiceDetailsDialog";
import MechanicListDialog from "@/components/MechanicListDialog";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{username: string; role: string; name: string} | null>(null);

  const handleLogin = (userData: { username: string; role: string; name: string }) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveTab("dashboard");
  };

  const handleQuickAction = (action: string) => {
    switch(action) {
      case "customers":
        setActiveTab("customers");
        break;
      case "booking":
        setActiveTab("queue");
        break;
      case "stock":
        setActiveTab("stock");
        break;
      case "reports":
        setActiveTab("reports");
        break;
      case "invoice":
        setActiveTab("invoice");
        break;
      default:
        break;
    }
  };

  if (!isLoggedIn || !currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 pb-20">
        {/* Header */}
        <div className="bg-red-600 rounded-lg p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <Wrench className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Service Djaya Motor</h1>
                <p className="text-red-100 text-sm">
                  {currentUser.role === "pemilik" ? "Panel Pemilik" : "Panel Kasir"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-sm">Selamat datang,</p>
              <p className="text-white font-semibold">{currentUser.name}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Content */}
          <div className="mb-20">
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-4">
              {/* Quick Actions */}
              <Card className="bg-red-600 text-white shadow-sm">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button 
                      className="bg-green-500 hover:bg-green-600 text-white h-12 flex-col space-y-1"
                      onClick={() => handleQuickAction("booking")}
                    >
                      <Calendar className="w-5 h-5" />
                      <span className="text-xs">Antrian Baru</span>
                    </Button>
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600 text-white h-12 flex-col space-y-1"
                      onClick={() => handleQuickAction("customers")}
                    >
                      <Users className="w-5 h-5" />
                      <span className="text-xs">Daftar Pelanggan</span>
                    </Button>
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600 text-white h-12 flex-col space-y-1"
                      onClick={() => handleQuickAction("stock")}
                    >
                      <Package className="w-5 h-5" />
                      <span className="text-xs">Cek Stok</span>
                    </Button>
                    <Button 
                      className="bg-purple-500 hover:bg-purple-600 text-white h-12 flex-col space-y-1"
                      onClick={() => handleQuickAction("invoice")}
                    >
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-xs">Buat Invoice</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ServiceDetailsDialog>
                  <Card className="bg-red-600 text-white shadow-sm cursor-pointer hover:bg-red-700 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm opacity-90">Servis Hari Ini</p>
                        <div className="text-3xl font-bold mt-1">7</div>
                        <p className="text-xs opacity-75">Klik untuk detail</p>
                      </div>
                    </CardContent>
                  </Card>
                </ServiceDetailsDialog>

                <MechanicListDialog>
                  <Card className="bg-red-600 text-white shadow-sm cursor-pointer hover:bg-red-700 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <p className="text-sm opacity-90">Mekanik Aktif</p>
                        <div className="text-3xl font-bold mt-1">5</div>
                        <p className="text-xs opacity-75">Dari 8 mekanik</p>
                      </div>
                    </CardContent>
                  </Card>
                </MechanicListDialog>

                <Card className="bg-red-600 text-white shadow-sm">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <p className="text-sm opacity-90">Kendaraan Antri</p>
                      <div className="text-3xl font-bold mt-1">5</div>
                      <p className="text-xs opacity-75">Sedang diproses</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-gray-800">Aktivitas Terbaru</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Servis B 1234 ABC selesai</p>
                      <p className="text-sm text-gray-600">Honda Vario - Tune Up</p>
                    </div>
                    <span className="text-xs text-gray-500">10:30</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Antrian baru diterima</p>
                      <p className="text-sm text-gray-600">D 5678 EFG - Servis berkala</p>
                    </div>
                    <span className="text-xs text-gray-500">09:15</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Invoice dibuat</p>
                      <p className="text-sm text-gray-600">Total: Rp 150.000</p>
                    </div>
                    <span className="text-xs text-gray-500">08:45</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Service Queue Tab */}
            <TabsContent value="queue">
              <ServiceQueue />
            </TabsContent>

            {/* Service Tracking Tab */}
            <TabsContent value="tracking">
              <ServiceTracking />
            </TabsContent>

            {/* Stock Tab */}
            <TabsContent value="stock">
              <SpareParts />
            </TabsContent>

            {/* Customers Tab */}
            <TabsContent value="customers">
              <CustomerList />
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <Reports />
            </TabsContent>

            {/* Invoice Tab */}
            <TabsContent value="invoice">
              <Invoice />
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <Account user={currentUser} onLogout={handleLogout} />
            </TabsContent>
          </div>

          {/* Bottom Navigation Tabs */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <TabsList className="grid w-full grid-cols-3 h-16 bg-transparent rounded-none">
              <TabsTrigger 
                value="dashboard" 
                className="flex flex-col gap-1 text-gray-600 data-[state=active]:text-red-600 data-[state=active]:bg-red-50 rounded-none"
              >
                <Home className="w-5 h-5" />
                <span className="text-xs">Home</span>
              </TabsTrigger>
              <TabsTrigger 
                value="queue" 
                className="flex flex-col gap-1 text-gray-600 data-[state=active]:text-red-600 data-[state=active]:bg-red-50 rounded-none"
              >
                <ClipboardList className="w-5 h-5" />
                <span className="text-xs">Antrian</span>
              </TabsTrigger>
              <TabsTrigger 
                value="account" 
                className="flex flex-col gap-1 text-gray-600 data-[state=active]:text-red-600 data-[state=active]:bg-red-50 rounded-none"
              >
                <User className="w-5 h-5" />
                <span className="text-xs">User</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;