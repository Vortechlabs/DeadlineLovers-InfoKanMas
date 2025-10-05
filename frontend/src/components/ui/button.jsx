import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: 
          "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500 shadow-sm",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500 shadow-sm",
        outline:
          "border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700 shadow-sm",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500",
        ghost:
          "hover:bg-gray-100 hover:text-gray-900 text-gray-700",
        link: 
          "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
        success:
          "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500 shadow-sm",
        warning:
          "bg-orange-600 text-white hover:bg-orange-700 focus-visible:ring-orange-500 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "size-10",
        xs: "h-7 rounded-md px-2 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }