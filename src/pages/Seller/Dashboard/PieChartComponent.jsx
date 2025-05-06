import * as React from 'react'
import { Label, Pie, PieChart, Sector } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '~/components/ui/card'
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent
} from '~/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'

const desktopData = [
  { status: 'pending', desktop: 186, fill: 'var(--color-pending)' },
  { status: 'packaging', desktop: 305, fill: 'var(--color-packaging)' },
  { status: 'delivering', desktop: 237, fill: 'var(--color-delivering)' },
  { status: 'delivered', desktop: 173, fill: 'var(--color-delivered)' },
  { status: 'aborted', desktop: 209, fill: 'var(--color-aborted)' }
]

const chartConfig = {
  visitors: {
    label: 'đơn hàng'
  },
  desktop: {
    label: 'Desktop'
  },
  mobile: {
    label: 'Mobile'
  },
  pending: {
    label: 'Đang xử lý',
    color: 'hsl(var(--chart-1))'
  },
  packaging: {
    label: 'Đang đóng gói',
    color: 'hsl(var(--chart-2))'
  },
  delivering: {
    label: 'Đang vận chuyển',
    color: 'hsl(var(--chart-3))'
  },
  delivered: {
    label: 'Đã giao',
    color: 'hsl(var(--chart-4))'
  },
  aborted: {
    label: 'Đã hủy',
    color: 'hsl(var(--chart-5))'
  }
}

export function PieChartComponent() {
  const id = 'pie-interactive'
  const [activeMonth, setActiveMonth] = React.useState(desktopData[0].status)

  const activeIndex = React.useMemo(
    () => desktopData.findIndex((item) => item.status === activeMonth),
    [activeMonth]
  )
  const statuses = React.useMemo(() => desktopData.map((item) => item.status), [])

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Tổng số đơn hàng theo trạng thái</CardTitle>
          <CardDescription>Tất cả đơn hàng</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {statuses.map((key) => {
              const config = chartConfig[key]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: `var(--color-${key})`
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {desktopData[activeIndex].desktop.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          đơn hàng
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
