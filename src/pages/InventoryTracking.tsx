import React, { useState, useMemo } from 'react';
import { PlusCircle, Search } from 'lucide-react';

// Custom Layout Components
import AppHeader from '@/components/layout/AppHeader';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AppFooter from '@/components/layout/AppFooter';
import InventoryItemRow from '@/components/InventoryItemRow';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define the type for an inventory item
interface InventoryItem {
  id: number;
  name: string;
  currentStock: number;
  maxStock: number;
  unit: string;
}

// Placeholder data for the inventory
const initialInventory: InventoryItem[] = [
  { id: 1, name: 'Organic Whole Wheat Flour', currentStock: 15, maxStock: 100, unit: 'kg' },
  { id: 2, name: 'Active Dry Yeast', currentStock: 45, maxStock: 50, unit: 'g' },
  { id: 3, name: 'Belgian Dark Chocolate', currentStock: 8, maxStock: 20, unit: 'kg' },
  { id: 4, name: 'Sea Salt Flakes', currentStock: 900, maxStock: 1000, unit: 'g' },
  { id: 5, name: 'Unsalted Butter', currentStock: 30, maxStock: 50, unit: 'lbs' },
  { id: 6, name: 'Granulated Sugar', currentStock: 75, maxStock: 100, unit: 'kg' },
  { id: 7, name: 'Free-Range Eggs', currentStock: 22, maxStock: 144, unit: 'units' },
  { id: 8, name: 'Vanilla Extract', currentStock: 500, maxStock: 2000, unit: 'ml' },
];

const InventoryTracking = () => {
  console.log('InventoryTracking page loaded');
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // State for the new ingredient form
  const [newItemName, setNewItemName] = useState('');
  const [newItemCurrentStock, setNewItemCurrentStock] = useState('');
  const [newItemMaxStock, setNewItemMaxStock] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');

  const handleStockChange = (id: string | number, newQuantity: number) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === id ? { ...item, currentStock: newQuantity } : item
      )
    );
  };

  const handleAddNewItem = () => {
    if (newItemName && newItemMaxStock && newItemUnit) {
      const newItem: InventoryItem = {
        id: Date.now(), // Use timestamp for unique ID
        name: newItemName,
        currentStock: Number(newItemCurrentStock) || 0,
        maxStock: Number(newItemMaxStock),
        unit: newItemUnit,
      };
      setInventory([...inventory, newItem]);
      // Reset form and close dialog
      setNewItemName('');
      setNewItemCurrentStock('');
      setNewItemMaxStock('');
      setNewItemUnit('');
      setIsDialogOpen(false);
    }
  };

  const filteredInventory = useMemo(() =>
    inventory.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [inventory, searchTerm]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppHeader />
      <div className="flex">
        <CollapsibleSidebar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-20 md:gap-8 md:p-6 md:pt-20 lg:ml-64">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-800">Inventory Tracking</h1>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search ingredients..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full md:w-auto ml-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Ingredient
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Ingredient</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new inventory item.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={newItemName} onChange={e => setNewItemName(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="currentStock" className="text-right">Current Stock</Label>
                    <Input id="currentStock" type="number" value={newItemCurrentStock} onChange={e => setNewItemCurrentStock(e.target.value)} className="col-span-3" />
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="maxStock" className="text-right">Max Stock</Label>
                    <Input id="maxStock" type="number" value={newItemMaxStock} onChange={e => setNewItemMaxStock(e.target.value)} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="unit" className="text-right">Unit</Label>
                    <Input id="unit" value={newItemUnit} onChange={e => setNewItemUnit(e.target.value)} placeholder="e.g., kg, g, lbs" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleAddNewItem}>Save Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="rounded-lg border bg-background shadow-sm">
            {/* Header for the list */}
            <div className="grid grid-cols-12 items-center gap-4 py-3 px-4 border-b bg-slate-50">
              <div className="col-span-4 font-semibold text-sm text-slate-600">Ingredient Name</div>
              <div className="col-span-5 font-semibold text-sm text-slate-600">Stock Level</div>
              <div className="col-span-3 font-semibold text-sm text-slate-600 text-right">Actions</div>
            </div>
            {/* Scrollable list content */}
            <ScrollArea className="h-[calc(100vh-22rem)]">
              {filteredInventory.length > 0 ? (
                filteredInventory.map((item) => (
                  <InventoryItemRow
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    currentStock={item.currentStock}
                    maxStock={item.maxStock}
                    unit={item.unit}
                    onStockChange={handleStockChange}
                  />
                ))
              ) : (
                <div className="p-6 text-center text-muted-foreground">No ingredients found.</div>
              )}
            </ScrollArea>
          </div>
          
          <AppFooter />
        </main>
      </div>
    </div>
  );
};

export default InventoryTracking;