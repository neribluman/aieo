'use client'

import { cn } from "@/lib/utils"
import { Legend, LegendProps, Tooltip, TooltipProps } from "recharts"

export type ChartConfig = {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  return (
    <div
      className={cn("relative", className)}
      style={
        {
          "--color-perplexity": config.Perplexity?.color,
          "--color-claude": config.Claude?.color,
          "--color-gemini": config.Gemini?.color,
          "--color-searchgpt": config.SearchGPT?.color,
          "--color-aio": config.AIO?.color,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  )
}

interface ChartLegendProps extends Omit<LegendProps, "content"> {
  content: React.ComponentType<any>
}

export function ChartLegend({ content: Content, ...props }: ChartLegendProps) {
  return <Legend content={(props) => <Content {...props} />} {...props} />
}

export function ChartLegendContent({ payload }: { payload?: Array<any> }) {
  if (!payload) return null

  return (
    <div className="flex gap-8">
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div
            className="rounded-full w-3 h-3"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

interface ChartTooltipProps extends Omit<TooltipProps<any, any>, "content"> {
  content: React.ComponentType<any>
}

export function ChartTooltip({ content: Content, ...props }: ChartTooltipProps) {
  return <Tooltip content={(props) => <Content {...props} />} {...props} />
}

interface ChartTooltipContentProps {
  active?: boolean
  payload?: Array<any>
  label?: string
  indicator?: "dot" | "line"
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  indicator = "dot",
}: ChartTooltipContentProps) {
  if (!active || !payload) return null

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">{label}</div>
        </div>
        <div className="grid gap-1">
          {payload.map((data, i) => (
            <div key={i} className="flex items-center gap-2">
              {indicator === "dot" && (
                <div
                  className="rounded-full w-2 h-2"
                  style={{ backgroundColor: data.color }}
                />
              )}
              {indicator === "line" && (
                <div
                  className="w-4 h-[2px]"
                  style={{ backgroundColor: data.color }}
                />
              )}
              <span className="text-sm font-medium tabular-nums">
                {data.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {data.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 