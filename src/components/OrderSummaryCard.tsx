import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, User, Hash, ChevronDown } from 'lucide-react';

// Define the possible statuses for an order
type OrderStatus = 'Pending' | 'In Progress' | 'Ready for Pickup' | 'Completed' | 'Cancelled';

// Define the props for the component
interface OrderSummaryCardProps {
  orderId: string;
  customerName: string;
  dueDate: string;
  initialStatus: OrderStatus;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
}

// A helper to map statuses to badge styles
const statusConfig: Record<OrderStatus, { text: string; className: string }> = {
  'Pending': { text: 'Pending', className: 'bg-gray-200 text-gray-800 hover:bg-gray-200' },
  'In Progress': { text: 'In Progress', className: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
  'Ready for Pickup': { text: 'Ready for Pickup', className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' },
  'Completed': { text: 'Completed', className: 'bg-green-100 text-green-800 hover:bg-green-100' },
  'Cancelled': { text: 'Cancelled', className: 'bg-red-100 text-red-800 hover:bg-red-100' },
};

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  orderId,
  customerName,
  dueDate,
  initialStatus,
  onStatusChange
}) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(initialStatus);
  console.log(`OrderSummaryCard loaded for order: ${orderId}`);

  const handleStatusUpdate = (newStatus: OrderStatus) => {
    setCurrentStatus(newStatus);
    onStatusChange(orderId, newStatus);
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

  const availableStatuses = Object.keys(statusConfig) as OrderStatus[];

  return (
    <Card className="w-full max-w-sm flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardDescription className="flex items-center text-sm text-gray-500">
                    <Hash className="h-4 w-4 mr-1.5" /> Order ID
                </CardDescription>
                <CardTitle>{orderId}</CardTitle>
            </div>
            <Badge className={statusConfig[currentStatus].className}>
                {statusConfig[currentStatus].text}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-gray-700">
          <User className="h-5 w-5 mr-3 text-gray-400" />
          <span>{customerName}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Calendar className="h-5 w-5 mr-3 text-gray-400" />
          <span>Due by: {dueDate}</span>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full">
              Update Status
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {availableStatuses
              .filter(status => status !== currentStatus)
              .map(status => (
                <DropdownMenuItem key={status} onSelect={() => handleStatusUpdate(status)}>
                  <span>Set as "{status}"</span>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default OrderSummaryCard;