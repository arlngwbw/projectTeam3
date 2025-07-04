
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Bell, Lock, Phone, Mail, Crown, UserCheck } from "lucide-react";

interface AccountProps {
  user: {
    username: string;
    role: string;
    name: string;
  };
  onLogout: () => void;
}

const Account = ({ user, onLogout }: AccountProps) => {
  const getRoleIcon = () => {
    return user.role === "pemilik" ? <Crown className="w-8 h-8 text-white" /> : <UserCheck className="w-8 h-8 text-white" />;
  };

  const getRoleColor = () => {
    return user.role === "pemilik" ? "bg-purple-600" : "bg-blue-600";
  };

  const getRoleBadgeColor = () => {
    return user.role === "pemilik" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800";
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">Akun</h2>

      {/* Profile Card */}
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 ${getRoleColor()} rounded-full flex items-center justify-center`}>
              {getRoleIcon()}
            </div>
            <div className="flex-1">
              <CardTitle className="text-gray-800">{user.name}</CardTitle>
              <p className="text-gray-600 capitalize">{user.role === "pemilik" ? "Pemilik Bengkel" : "Kasir"}</p>
              <Badge className={`mt-1 ${getRoleBadgeColor()}`}>
                {user.role === "pemilik" ? "Pemilik" : "Kasir"}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {user.role === "pemilik" ? "08123456789" : "08187654321"}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">
              {user.role === "pemilik" ? "iwan@djayamotor.com" : "admin@djayamotor.com"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 text-center">
            <div className={`text-2xl font-bold ${user.role === "pemilik" ? "text-purple-600" : "text-blue-600"}`}>
              {user.role === "pemilik" ? "30" : "15"}
            </div>
            <p className="text-sm text-gray-600">Hari Aktif</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {user.role === "pemilik" ? "1,250" : "348"}
            </div>
            <p className="text-sm text-gray-600">
              {user.role === "pemilik" ? "Total Servis" : "Servis Selesai"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Menu Options */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-0">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start p-4 h-auto">
              <Settings className="w-5 h-5 mr-3 text-gray-500" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Pengaturan Akun</p>
                <p className="text-sm text-gray-600">Ubah data profil dan preferensi</p>
              </div>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start p-4 h-auto">
              <Bell className="w-5 h-5 mr-3 text-gray-500" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Notifikasi</p>
                <p className="text-sm text-gray-600">Atur pemberitahuan aplikasi</p>
              </div>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start p-4 h-auto">
              <Lock className="w-5 h-5 mr-3 text-gray-500" />
              <div className="text-left">
                <p className="font-medium text-gray-800">Keamanan</p>
                <p className="text-sm text-gray-600">Ubah password dan keamanan</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button 
        onClick={onLogout}
        className="w-full bg-red-600 hover:bg-red-700 text-white"
      >
        Keluar
      </Button>

      {/* App Info */}
      <Card className="bg-white shadow-sm">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-gray-600">Service Djaya Motor</p>
          <p className="text-xs text-gray-500">Versi 1.0.0</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;
