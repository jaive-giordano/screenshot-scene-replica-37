import { cn } from "@/lib/utils";
import logo from "@/assets/logo-jaive-giordano.png.asset.json";

/**
 * Owner's brand lockup: the "JG" monogram above the "JAIVE GIORDANO" wordmark.
 * object-contain keeps the whole lockup proportional with nothing cropped, and
 * mix-blend-multiply lets the logo's white background merge into the light page.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Jaive Giordano"
      width={1098}
      height={852}
      className={cn("h-10 w-auto object-contain mix-blend-multiply", className)}
    />
  );
}
