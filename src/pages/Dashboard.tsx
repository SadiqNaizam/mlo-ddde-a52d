import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ShoppingCart, Croissant, AlertTriangle } from 'lucide-react';

// Layout Components
import AppHeader from '@/components/layout/AppHeader';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AppFooter from '@/components/layout/AppFooter';

// Custom UI Components
import AnalyticsWidget from '@/components/AnalyticsWidget';
import ScheduleTaskCard, { TaskStatus } from '@/components/ScheduleTaskCard';
import OrderSummaryCard from '@/components/OrderSummaryCard';

// shadcn/ui Components
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Placeholder Data
const salesData = [
  { name: 'Mon', revenue: 450 },
  { name: 'Tue', revenue: 520 },
  { name: 'Wed', revenue: 680 },
  { name: 'Thu', revenue: 590 },
  { name: 'Fri', revenue: 810 },
  { name: 'Sat', revenue: 1240 },
  { name: 'Sun', revenue: 1100 },
];

const lowInventoryItems = [
  { id: 'inv-1', name: 'Organic Whole Wheat Flour', stock: 5, unit: 'kg' },
  { id: 'inv-2', name: 'Belgian Chocolate Callets', stock: 2, unit: 'kg' },
  { id: 'inv-3', name: 'Madagascar Vanilla Extract', stock: 1, unit: 'bottle' },
];

const todaysTasks = [
  { id: 'task-1', productName: 'Sourdough Loaf', quantity: 40, scheduledTime: '6:00 AM - 9:00 AM', status: 'in-progress' as TaskStatus },
  { id: 'task-2', productName: 'Almond Croissants', quantity: 60, scheduledTime: '8:00 AM - 10:00 AM', status: 'pending' as TaskStatus },
  { id: 'task-3', productName: 'Classic Baguette', quantity: 50, scheduledTime: '10:00 AM - 12:00 PM', status: 'pending' as TaskStatus },
];

const pendingOrders = [
  { orderId: '#ORD-0024', customerName: 'The Corner Cafe', dueDate: 'Today, 2:00 PM', initialStatus: 'Ready for Pickup' as const },
  { orderId: '#ORD-0025', customerName: 'Alice Johnson', dueDate: 'Tomorrow, 11:00 AM', initialStatus: 'In Progress' as const },
  { orderId: '#ORD-0026', customerName: 'Weekly Bread Subscription', dueDate: 'Friday, 9:00 AM', initialStatus: 'Pending' as const },
];

const Dashboard = () => {
  console.log('Dashboard loaded');

  const handleOrderStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Order ${orderId} status changed to ${newStatus} on the dashboard.`);
    // In a real app, this would trigger a mutation to update the backend.
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <CollapsibleSidebar />
      <div className="flex flex-1 flex-col md:pl-64">
        <AppHeader />
        <main className="flex-1 space-y-8 p-4 pt-20 md:p-8">
          {/* Section 1: High-Level Analytics */}
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnalyticsWidget title="Sales Overview" description="Total revenue from the last 7 days.">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </AnalyticsWidget>

            <AnalyticsWidget title="Low Inventory Alerts" description="Items that are running low in stock.">
              <div className="flex h-full flex-col justify-between">
                <ul className="space-y-3">
                  {lowInventoryItems.map(item => (
                    <li key={item.id} className="flex items-center justify-between text-sm">
                      <div className="font-medium">{item.name}</div>
                      <Badge variant="destructive">{item.stock} {item.unit} left</Badge>
                    </li>
                  ))}
                </ul>
                <Link to="/inventory-tracking" className="mt-4">
                  <Button variant="outline" className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" /> View Full Inventory
                  </Button>
                </Link>
              </div>
            </AnalyticsWidget>

            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
                <CardDescription>At-a-glance performance metrics.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                 <div className="flex items-center">
                    <Croissant className="mr-4 h-6 w-6 text-amber-700"/>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Most Popular Item (Week)</p>
                        <p className="text-lg font-bold">Almond Croissants</p>
                    </div>
                 </div>
                 <div className="flex items-center">
                    <AlertTriangle className="mr-4 h-6 w-6 text-red-500"/>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Urgent Actions</p>
                        <p className="text-lg font-bold">3 Low Stock Items</p>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Operational View */}
          <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Today's Baking Schedule</CardTitle>
                <Link to="/baking-schedule">
                  <Button variant="ghost" size="sm">
                    View Full Schedule <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {todaysTasks.map(task => (
                  <ScheduleTaskCard key={task.id} {...task} />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New & Pending Orders</CardTitle>
                 <CardDescription>Orders requiring attention.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingOrders.map(order => (
                  <OrderSummaryCard key={order.orderId} {...order} onStatusChange={handleOrderStatusChange} />
                ))}
              </CardContent>
            </Card>
          </section>
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default Dashboard;