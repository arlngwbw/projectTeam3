
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Package, AlertTriangle } from "lucide-react";

const SpareParts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [spareParts] = useState([
    {
      id: 1,
      name: "Oli Mesin 10W-40",
      category: "Oli",
      stock: 25,
      minStock: 10,
      price: 45000,
      supplier: "Pertamina",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7908?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Filter Udara",
      category: "Filter",
      stock: 5,
      minStock: 15,
      price: 35000,
      supplier: "Astra Honda",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Busi NGK",
      category: "Kelistrikan",
      stock: 50,
      minStock: 20,
      price: 25000,
      supplier: "NGK",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Ban Luar 80/90-17",
      category: "Ban",
      stock: 3,
      minStock: 8,
      price: 150000,
      supplier: "Dunlop",
      image: "https://images.unsplash.com/photo-1558049201-c2708c645f96?w=300&h=200&fit=crop"
    }
  ]);

  const filteredParts = spareParts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock) {
      return { color: "bg-red-500", text: "Stok Menipis" };
    } else if (stock <= minStock * 1.5) {
      return { color: "bg-yellow-500", text: "Perlu Restock" };
    }
    return { color: "bg-green-500", text: "Stok Aman" };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  return (
    <div className="p-4 space-y-4 bg-gray-200 min-h-screen">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Cek Stok Sparepart</h2>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Cari sparepart..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white shadow-sm"
        />
      </div>

      {/* Critical Stock Alert */}
      {spareParts.filter(part => part.stock <= part.minStock).length > 0 && (
        <Card className="bg-red-50 border-red-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Peringatan Stok Kritis!</p>
                <p className="text-red-600 text-sm">
                  {spareParts.filter(part => part.stock <= part.minStock).length} item perlu segera direstock
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Spare Parts List */}
      {filteredParts.map((part) => {
        const stockStatus = getStockStatus(part.stock, part.minStock);
        return (
          <Card key={part.id} className="bg-white shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-red-600" />
                  {part.name}
                </CardTitle>
                <Badge className={`${stockStatus.color} text-white`}>
                  {stockStatus.text}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex space-x-4">
                <img 
                  src={part.image} 
                  alt={part.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Kategori</p>
                      <p className="font-medium text-gray-800">{part.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Supplier</p>
                      <p className="font-medium text-gray-800">{part.supplier}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Stok</p>
                      <p className="font-bold text-lg text-gray-800">{part.stock}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Min Stok</p>
                      <p className="font-medium text-gray-800">{part.minStock}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Harga</p>
                      <p className="font-bold text-lg text-red-600">{formatCurrency(part.price)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SpareParts;
