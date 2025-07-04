
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Wrench,
  Calendar,
  Download,
  FileText
} from "lucide-react";

const Reports = () => {
  // Data dummy untuk laporan
  const dailyReport = [
    { date: "2024-07-01", services: 8, revenue: 2400000, customers: 6 },
    { date: "2024-07-02", services: 12, revenue: 3600000, customers: 9 },
    { date: "2024-06-30", services: 10, revenue: 3000000, customers: 8 },
    { date: "2024-06-29", services: 6, revenue: 1800000, customers: 5 },
    { date: "2024-06-28", services: 9, revenue: 2700000, customers: 7 }
  ];

  const monthlyStats = {
    totalRevenue: 45600000,
    totalServices: 156,
    totalCustomers: 89,
    avgRevenuePerService: 292308
  };

  const popularServices = [
    { service: "Tune Up", count: 45, revenue: 13500000 },
    { service: "Ganti Oli", count: 89, revenue: 8900000 },
    { service: "Service Berkala", count: 34, revenue: 10200000 },
    { service: "Perbaikan Rem", count: 23, revenue: 6900000 },
    { service: "Ganti Ban", count: 18, revenue: 5400000 }
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-800">Laporan Bengkel</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="summary">Ringkasan</TabsTrigger>
              <TabsTrigger value="daily">Harian</TabsTrigger>
              <TabsTrigger value="services">Layanan</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Pendapatan</p>
                        <p className="text-2xl font-bold text-green-600">
                          Rp {monthlyStats.totalRevenue.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Servis</p>
                        <p className="text-2xl font-bold text-blue-600">{monthlyStats.totalServices}</p>
                      </div>
                      <Wrench className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Pelanggan</p>
                        <p className="text-2xl font-bold text-purple-600">{monthlyStats.totalCustomers}</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Rata-rata per Servis</p>
                        <p className="text-2xl font-bold text-orange-600">
                          Rp {monthlyStats.avgRevenuePerService.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Daily Tab */}
            <TabsContent value="daily">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jumlah Servis</TableHead>
                      <TableHead>Pendapatan</TableHead>
                      <TableHead>Pelanggan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailyReport.map((day, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {day.date}
                          </div>
                        </TableCell>
                        <TableCell>{day.services}</TableCell>
                        <TableCell>Rp {day.revenue.toLocaleString('id-ID')}</TableCell>
                        <TableCell>{day.customers}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Jenis Layanan</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Total Pendapatan</TableHead>
                      <TableHead>Rata-rata</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {popularServices.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{service.service}</TableCell>
                        <TableCell>{service.count}</TableCell>
                        <TableCell>Rp {service.revenue.toLocaleString('id-ID')}</TableCell>
                        <TableCell>Rp {(service.revenue / service.count).toLocaleString('id-ID', { maximumFractionDigits: 0 })}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
