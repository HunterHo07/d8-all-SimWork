import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "futuristic" | "minimal";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring",
      futuristic: "border-indigo-500/50 bg-black/50 text-white placeholder:text-gray-400 focus-visible:ring-indigo-500 backdrop-blur-sm shadow-glow-blue-sm",
      minimal: "border-transparent bg-transparent placeholder:text-muted-foreground focus-visible:border-input"
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
