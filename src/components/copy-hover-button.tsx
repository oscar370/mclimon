"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type CopyHoverButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  copiedLabel?: React.ReactNode;
  timeout?: number;
  onCopy?: (value: string) => void;
};

export function CopyHoverButton({
  children,
  value,
  copiedLabel = "¡Copiado!",
  timeout = 2000,
  onCopy,
  className,
  onClick,
  ...props
}: CopyHoverButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopy?.(value);

      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error("No se pudo copiar al portapapeles:", err);
    }
  };

  return (
    <button
      type="button"
      data-copied={copied}
      onClick={handleClick}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden border bg-background p-2 px-6 text-center font-semibold",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 bg-primary transition-all duration-300 group-hover:scale-[100.8] group-data-[copied=true]:scale-[100.8]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 group-data-[copied=true]:translate-x-12 group-data-[copied=true]:opacity-0">
          {children}
        </span>
      </div>

      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100 group-data-[copied=true]:-translate-x-5 group-data-[copied=true]:opacity-100">
        <span>{copied ? copiedLabel : children}</span>

        <span className="relative size-4">
          <Copy
            className={cn(
              "absolute inset-0 size-4 font-pixelify transition-all duration-200",
              copied
                ? "scale-0 rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100"
            )}
          />
          <Check
            className={cn(
              "absolute inset-0 size-4 transition-all duration-200",
              copied
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 -rotate-90 opacity-0"
            )}
          />
        </span>
      </div>

      <span className="sr-only" aria-live="polite">
        {copied ? "Copiado al portapapeles" : ""}
      </span>
    </button>
  );
}
