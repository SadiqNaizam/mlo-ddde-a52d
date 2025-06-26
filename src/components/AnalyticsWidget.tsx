import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnalyticsWidgetProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const AnalyticsWidget: React.FC<AnalyticsWidgetProps> = ({
  title,
  description,
  children,
}) => {
  const [dateRange, setDateRange] = useState("30d");

  console.log("AnalyticsWidget loaded for:", title);

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    // In a real application, you would trigger a data refetch here
    console.log(`Date range changed to: ${value}`);
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="grid gap-1">
            <CardTitle>{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger
              className="w-full sm:w-[160px]"
              aria-label="Select date range"
            >
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        {/* The chart component is passed as a child and rendered here */}
        {children}
      </CardContent>
    </Card>
  );
};

export default AnalyticsWidget;