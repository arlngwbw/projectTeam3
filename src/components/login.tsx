
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wrench, User, Lock, AlertCircle } from "lucide-react";

interface LoginProps {
  onLogin: (userData: { username: string; role: string; name: string }) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const users = [
    { username: "admin", password: "admin123", role: "kasir", name: "Admin Kasir" },
    { username: "iwan", password: "iwan123", role: "pemilik", name: "Iwan Setiawan" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin({ username: user.username, role: user.role, name: user.name });
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="text-center bg-red-600 text-white rounded-t-lg">
          <div className="flex justify-center mb-2">
            <div className="bg-white p-3 rounded-full">
              <Wrench className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold">Service Djaya Motor</CardTitle>
          <p className="text-red-100 text-sm">Login Sistem</p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="pl-10"
                />
              </div>
            </div>
            
            {error && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
              Login
            </Button>
          </form>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
            <p className="font-medium">Demo Login:</p>
            <p>Kasir - Username: admin, Password: admin123</p>
            <p>Pemilik - Username: iwan, Password: iwan123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
