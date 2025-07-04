
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Phone, Mail, Edit } from "lucide-react";
import { useState } from "react";
import AddCustomerDialog from "./AddCustomerDialog";

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      phone: "081234567890",
      email: "budi.santoso@email.com",
      address: "Jl. Sudirman No. 123, Jakarta",
      vehicle: "Honda Vario 125",
      plateNumber: "B 1234 ABC",
      lastService: "2024-06-15"
    },
    {
      id: 2,
      name: "Siti Rahayu",
      phone: "082345678901",
      email: "siti.rahayu@email.com",
      address: "Jl. Gatot Subroto No. 456, Jakarta",
      vehicle: "Yamaha Nmax",
      plateNumber: "B 5678 DEF",
      lastService: "2024-06-20"
    },
    {
      id: 3,
      name: "Ahmad Wijaya",
      phone: "083456789012",
      email: "ahmad.wijaya@email.com",
      address: "Jl. Thamrin No. 789, Jakarta",
      vehicle: "Honda Beat",
      plateNumber: "B 9012 GHI",
      lastService: "2024-06-25"
    },
    {
      id: 4,
      name: "Maya Dewi",
      phone: "084567890123",
      email: "maya.dewi@email.com",
      address: "Jl. Kuningan No. 321, Jakarta",
      vehicle: "Suzuki Address",
      plateNumber: "B 3456 JKL",
      lastService: "2024-06-28"
    }
  ]);

  const addNewCustomer = (customerData: {
    name: string;
    phone: string;
    email: string;
    address: string;
    vehicle: string;
    plateNumber: string;
  }) => {
    const newCustomer = {
      id: Date.now(),
      name: customerData.name,
      phone: customerData.phone,
      email: customerData.email || "-",
      address: customerData.address || "-",
      vehicle: customerData.vehicle,
      plateNumber: customerData.plateNumber,
      lastService: new Date().toISOString().split('T')[0]
    };
    setCustomers([...customers, newCustomer]);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800">Daftar Pelanggan</CardTitle>
            <AddCustomerDialog onAddCustomer={addNewCustomer} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari pelanggan (nama, plat nomor, kendaraan)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Customer Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Kendaraan</TableHead>
                  <TableHead>Plat Nomor</TableHead>
                  <TableHead>Servis Terakhir</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-32">{customer.address}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-3 h-3 mr-1" />
                          {customer.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-3 h-3 mr-1" />
                          {customer.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-gray-900">{customer.vehicle}</p>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {customer.plateNumber}
                      </span>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-600">{customer.lastService}</p>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerList;
