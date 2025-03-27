"use client"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetGraph } from "@/client_actions/superadmin/dashboard"
import { useMemo, useState } from "react"

export const description = "A linear line chart"

const transformChartData = (apiResponse: any) => {
  if (!apiResponse || typeof apiResponse !== "object" || !apiResponse.data) return [];

  const data = apiResponse.data;

  return Object.entries(data).map(([time, value]) => ({
    time,  // Use the key as time (e.g., "00:00", "Monday", "January", "2025")
    value: Number(value) || 0, // Ensure the value is a number
  }));
};

const chartConfig = {
  count: {
    label: "Hourly Data",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Linechart() {
  const [type, setType] = useState('daily')
  const {data} = useGetGraph(type)

  
  const chartData = useMemo(() => transformChartData(data), [data]);

  console.log(chartData)

  return (
    <Card className=" border-[1px] border-amber-500 overflow-hidden">
      <CardHeader className=" flex justify-between bg-light">
        <div className=" w-full flex justify-between">
          <div className=" flex flex-col gap-1">
            <CardTitle>User Registration</CardTitle>
            {/* <CardDescription>January - June 2024</CardDescription> */}
          </div>

          <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-[112px] h-[30px] text-xs">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>

        </div>
        
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="value"
              type="linear"
              stroke="#c29709"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  )
}
