import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface InventoryItemRowProps {
  id: string | number;
  name: string;
  currentStock: number;
  maxStock: number;
  unit: string;
  onStockChange: (id: string | number, newQuantity: number) => void;
}

const InventoryItemRow: React.FC<InventoryItemRowProps> = ({
  id,
  name,
  currentStock,
  maxStock,
  unit,
  onStockChange,
}) => {
  console.log('InventoryItemRow loaded for:', name);

  const stockPercentage = maxStock > 0 ? (currentStock / maxStock) * 100 : 0;

  const handleDecrement = () => {
    onStockChange(id, Math.max(0, currentStock - 1));
  };

  const handleIncrement = () => {
    onStockChange(id, currentStock + 1);
  };

  const getProgressColorClass = () => {
    if (stockPercentage < 25) {
      return '[&>div]:bg-red-500'; // Critical
    }
    if (stockPercentage < 50) {
      return '[&>div]:bg-yellow-500'; // Low
    }
    return '[&>div]:bg-green-500'; // Healthy
  };

  return (
    <div className="grid grid-cols-12 items-center gap-4 py-3 px-4 border-b border-slate-200 hover:bg-slate-50 transition-colors">
      <div className="col-span-4">
        <p className="font-medium text-slate-800">{name}</p>
      </div>

      <div className="col-span-5 flex items-center gap-4">
        <Progress
          value={stockPercentage}
          className={cn('h-2 w-full bg-slate-200', getProgressColorClass())}
          aria-label={`${stockPercentage.toFixed(0)}% in stock`}
        />
        <p className="text-sm text-slate-600 font-mono w-32 text-right">
          {currentStock} / {maxStock} {unit}
        </p>
      </div>

      <div className="col-span-3 flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleDecrement}
          aria-label={`Decrease stock for ${name}`}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleIncrement}
          aria-label={`Increase stock for ${name}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InventoryItemRow;