import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "outline" | "text";
}) {
  return (
    <a className={cn("button", `button-${variant}`, className)} {...props}>
      <span>{children}</span>
      <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}
