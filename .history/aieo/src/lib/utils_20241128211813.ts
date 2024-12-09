export const cx = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
} 