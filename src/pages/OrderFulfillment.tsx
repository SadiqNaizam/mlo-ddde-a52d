import React, { useState } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AppFooter from '@/components/layout/AppFooter';
import OrderSummaryCard from '@/components/OrderSummaryCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Define types locally for state management
type OrderStatus = 'Pending' | 'In Progress' | 'Ready for Pickup' | 'Completed' | 'Cancelled';

interface Order {
  orderId: string;
  customerName: string;
  dueDate: string;
  initialStatus: OrderStatus;
}

// Placeholder data for the order list
const initialOrders: Order[] = [
  { orderId: 'ORD-101', customerName: 'Alice Johnson', dueDate: '2024-08-25', initialStatus: 'Pending' },
  { orderId: 'ORD-102', customerName: 'Bob Williams', dueDate: '2024-08-24', initialStatus: 'In Progress' },
  { orderId: 'ORD-103', customerName: 'Charlie Brown', dueDate: '2024-08-23', initialStatus: 'Ready for Pickup' },
  { orderId: 'ORD-104', customerName: 'Diana Miller', dueDate: '2024-08-22', initialStatus: 'Completed' },
  { orderId: 'ORD-105', customerName: 'Eva Green', dueDate: '2024-08-26', initialStatus: 'Pending' },
  { orderId: 'ORD-106', customerName: 'Frank White', dueDate: '2024-08-21', initialStatus: 'Cancelled' },
  { orderId: 'ORD-107', customerName: 'Grace Lee', dueDate: '2024-08-25', initialStatus: 'In Progress' },
  { orderId: 'ORD-108', customerName: 'Henry Wilson', dueDate: '2024-08-24', initialStatus: 'Ready for Pickup' },
];

const OrderFulfillment = () => {
  console.log('OrderFulfillment page loaded');
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId ? { ...order, initialStatus: newStatus } : order
      )
    );
  };

  const allStatuses: OrderStatus[] = ['Pending', 'In Progress', 'Ready for Pickup', 'Completed', 'Cancelled'];
  const filterOrders = (status?: OrderStatus) => {
    if (!status) return orders;
    return orders.filter(o => o.initialStatus === status);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-col md:pl-64">
        <AppHeader />
        <main className="flex-1 flex flex-col gap-4 p-4 pt-20 md:gap-8 md:p-8 md:pt-24">
          <header>
            <h1 className="text-3xl font-bold tracking-tight">Order Fulfillment</h1>
            <p className="text-muted-foreground">Manage and track all customer orders.</p>
          </header>
          
          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                {allStatuses.map(status => (
                  <TabsTrigger key={status} value={status}>
                    {status}
                  </TabsTrigger>
                ))}
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {orders.map((order) => (
                  <OrderSummaryCard 
                    key={order.orderId}
                    {...order}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </TabsContent>

            {allStatuses.map(status => (
              <TabsContent key={status} value={status} className="mt-4">
                {filterOrders(status).length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filterOrders(status).map(order => (
                      <OrderSummaryCard
                        key={order.orderId}
                        {...order}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-24 text-center">
                    <h3 className="text-xl font-semibold">No {status.toLowerCase()} orders</h3>
                    <p className="text-sm text-muted-foreground">When new orders match this status, they will appear here.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default OrderFulfillment;