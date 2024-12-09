export const AvailableChartColors = [
  "blue",
  "violet",
  "emerald",
  "amber",
  "rose",
] as const

export type AvailableChartColorsKeys = typeof AvailableChartColors[number]

export const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: "stroke" | "fill" | "bg"
) => {
  return `${type}-${color}-500`
}

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[]
) => {
  const categoryColors = new Map<string, AvailableChartColorsKeys>()
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length])
  })
  return categoryColors
}

export const hasOnlyOneValueForKey = (
  data: Record<string, any>[],
  key: string
) => {
  return data.filter((item) => item[key] !== null && item[key] !== undefined).length === 1
}

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined
): [number | "auto", number | "auto"] => {
  return [
    autoMinValue ? "auto" : minValue ?? 0,
    maxValue ?? "auto",
  ]
} 