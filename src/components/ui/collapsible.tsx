
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import * as React from "react"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
    iconClassName?: string;
  }
>(({ className, children, iconClassName, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn("flex items-center justify-between w-full", className)}
    {...props}
  >
    {children}
    <div className={cn("transition-transform", iconClassName)}>
      <ChevronDown className="h-5 w-5 data-[state=open]:hidden" />
      <ChevronUp className="h-5 w-5 hidden data-[state=open]:block" />
    </div>
  </CollapsiblePrimitive.CollapsibleTrigger>
));
CollapsibleTrigger.displayName = CollapsiblePrimitive.CollapsibleTrigger.displayName;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
