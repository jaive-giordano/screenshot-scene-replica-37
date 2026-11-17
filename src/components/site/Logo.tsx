import { cn } from "@/lib/utils";

/** Minimalist "JG" monogram inside a warm terracotta rounded badge. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="JG"
      className={cn("size-10 shrink-0 drop-shadow-sm", className)}
    >
      <rect width="48" height="48" rx="14" className="fill-primary" />
      <g
        fill="none"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary-foreground"
      >
        {/* J */}
        <path d="M12.5 14h8M17.5 14v14.5a5 5 0 0 1-10 0" />
        {/* G */}
        <path d="M37.2 18.4A9 9 0 1 0 39 24h-7" />
      </g>
      <circle cx="39.5" cy="11" r="2" className="fill-amber" />
    </svg>
  );
}
