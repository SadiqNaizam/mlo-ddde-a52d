import React, { useState } from 'react';

// Custom Layout & Component Imports
import AppHeader from '@/components/layout/AppHeader';
import CollapsibleSidebar from '@/components/layout/CollapsibleSidebar';
import AppFooter from '@/components/layout/AppFooter';
import ScheduleTaskCard from '@/components/ScheduleTaskCard';
import type { TaskStatus } from '@/components/ScheduleTaskCard';

// shadcn/ui Component Imports
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Icon Import
import { PlusCircle } from 'lucide-react';

// Type definition for a baking task
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface BakingTask {
  id: number;
  productName: string;
  quantity: number;
  scheduledTime: string;
  status: TaskStatus;
  day: DayOfWeek;
}

// Sample Data
const weekDays: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const initialTasks: BakingTask[] = [
  { id: 1, productName: 'Sourdough Loaf', quantity: 20, scheduledTime: '06:00 AM', status: 'pending', day: 'Monday' },
  { id: 2, productName: 'Croissants', quantity: 50, scheduledTime: '07:30 AM', status: 'pending', day: 'Monday' },
  { id: 3, productName: 'Baguette', quantity: 40, scheduledTime: '08:00 AM', status: 'in-progress', day: 'Tuesday' },
  { id: 4, productName: 'Whole Wheat', quantity: 15, scheduledTime: '09:00 AM', status: 'completed', day: 'Wednesday' },
  { id: 5, productName: 'Sourdough Loaf', quantity: 25, scheduledTime: '06:00 AM', status: 'pending', day: 'Friday' },
  { id: 6, productName: 'Rye Bread', quantity: 10, scheduledTime: '10:00 AM', status: 'pending', day: 'Friday' },
];

const sampleRecipes = [
  "Sourdough Loaf",
  "Croissants",
  "Baguette",
  "Whole Wheat",
  "Rye Bread",
  "Cinnamon Buns"
];

const BakingSchedule = () => {
  console.log('BakingSchedule Page loaded');
  const [tasks, setTasks] = useState<BakingTask[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTask: BakingTask = {
      id: tasks.length + 1,
      productName: formData.get('recipe') as string,
      quantity: Number(formData.get('quantity')),
      scheduledTime: formData.get('time') as string,
      day: formData.get('day') as DayOfWeek,
      status: 'pending',
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsDialogOpen(false); // Close the dialog after adding
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppHeader />
      <CollapsibleSidebar />
      <div className="flex flex-col md:pl-64">
        <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-8 pt-20">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">
              Weekly Baking Schedule
            </h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Add New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Baking Task</DialogTitle>
                  <DialogDescription>
                    Plan your next bake. Select a recipe, set the quantity, and schedule it.
                  </DialogDescription>
                </DialogHeader>
                <form id="add-task-form" onSubmit={handleAddTask} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="recipe" className="text-right">Recipe</Label>
                    <Select name="recipe" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a recipe" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleRecipes.map(recipe => (
                          <SelectItem key={recipe} value={recipe}>{recipe}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">Quantity</Label>
                    <Input id="quantity" name="quantity" type="number" defaultValue="12" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="time" className="text-right">Time</Label>
                    <Input id="time" name="time" type="time" defaultValue="08:00" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="day" className="text-right">Day</Label>
                     <Select name="day" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                      <SelectContent>
                        {weekDays.map(day => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit" form="add-task-form">Save Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {weekDays.map(day => (
              <div key={day} className="flex flex-col gap-4 p-4 bg-background rounded-lg shadow-sm border">
                <h2 className="font-semibold text-center text-lg">{day}</h2>
                <div className="flex flex-col gap-4 min-h-[200px]">
                  {tasks.filter(t => t.day === day).length > 0 ? (
                    tasks.filter(t => t.day === day).map(task => (
                      <ScheduleTaskCard key={task.id} {...task} />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                      No bakes scheduled.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
        <AppFooter />
      </div>
    </div>
  );
};

export default BakingSchedule;