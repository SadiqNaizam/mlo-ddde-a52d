import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Package, GripVertical } from 'lucide-react';
import { cn } from "@/lib/utils";

export type TaskStatus = 'pending' | 'in-progress' | 'completed';

interface ScheduleTaskCardProps {
  id: string | number;
  productName: string;
  quantity: number;
  scheduledTime: string;
  status: TaskStatus;
}

const statusStyles: Record<TaskStatus, {
  borderColor: string;
  badgeVariant: "secondary" | "default" | "outline";
  textColor: string;
  bgColor: string;
}> = {
  pending: {
    borderColor: "border-blue-500",
    badgeVariant: "secondary",
    textColor: "text-blue-800",
    bgColor: "bg-blue-50",
  },
  'in-progress': {
    borderColor: "border-yellow-500",
    badgeVariant: "default",
    textColor: "text-yellow-800",
    bgColor: "bg-yellow-50",
  },
  completed: {
    borderColor: "border-green-500",
    badgeVariant: "outline",
    textColor: "text-green-800",
    bgColor: "bg-green-50",
  },
};

const ScheduleTaskCard: React.FC<ScheduleTaskCardProps> = ({
  id,
  productName,
  quantity,
  scheduledTime,
  status,
}) => {
  console.log('ScheduleTaskCard loaded for task:', id);

  const styles = statusStyles[status];

  return (
    <Card
      draggable="true"
      data-id={id}
      className={cn(
        "cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow duration-200 border-l-4 flex flex-col",
        styles.borderColor,
        styles.bgColor
      )}
    >
      <div className="flex items-start p-4">
        <div className="flex-grow">
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-base font-bold">{productName}</CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Package className="mr-2 h-4 w-4" />
              <span>Quantity: {quantity}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="mr-2 h-4 w-4" />
              <span>Time: {scheduledTime}</span>
            </div>
          </CardContent>
        </div>
        <div className="text-muted-foreground">
          <GripVertical className="h-5 w-5" />
        </div>
      </div>

      <CardFooter className="p-2 mt-auto bg-background/50 border-t">
        <Badge variant={styles.badgeVariant} className="capitalize">{status.replace('-', ' ')}</Badge>
      </CardFooter>
    </Card>
  );
};

export default ScheduleTaskCard;