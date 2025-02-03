// src/components/ui/shared.tsx
import React from "react";

// Card Components
export const Card = ({
  className = "",
  children,
}: React.HTMLProps<HTMLDivElement>) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({
  className = "",
  children,
}: React.HTMLProps<HTMLDivElement>) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

export const CardTitle = ({
  className = "",
  children,
}: React.HTMLProps<HTMLHeadingElement>) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
  >
    {children}
  </h3>
);

export const CardContent = ({
  className = "",
  children,
}: React.HTMLProps<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export const Button = ({
  className = "",
  variant = "default",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Input Component
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => (
  <input
    className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

// Textarea Component
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "", ...props }, ref) => (
  <textarea
    className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

// Dialog Components
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog = ({ children, open, onOpenChange }: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="bg-background/80 fixed inset-0 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
      />
      <div className="bg-background z-50 grid w-full max-w-lg gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg">
        {children}
      </div>
    </div>
  );
};

interface DialogTriggerProps {
  children: React.ReactElement;
  asChild?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

export const DialogTrigger = ({
  children,
  asChild,
  onClick,
}: DialogTriggerProps) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        onClick?.(e);
        (
          children.props as { onClick?: (e: React.MouseEvent) => void }
        ).onClick?.(e);
      },
    } as React.HTMLAttributes<HTMLElement>);
  }

  return (
    <div onClick={onClick} className="cursor-pointer">
      {children}
    </div>
  );
};

export const DialogContent = ({
  children,
  className = "",
}: React.HTMLProps<HTMLDivElement>) => (
  <div className={`relative ${className}`}>{children}</div>
);

export const DialogHeader = ({
  children,
  className = "",
}: React.HTMLProps<HTMLDivElement>) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
  >
    {children}
  </div>
);

export const DialogTitle = ({
  children,
  className = "",
}: React.HTMLProps<HTMLHeadingElement>) => (
  <h2
    className={`text-lg font-semibold leading-none tracking-tight text-black ${className}`}
  >
    {children}
  </h2>
);
