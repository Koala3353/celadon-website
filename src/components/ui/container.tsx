import { cn } from "@/lib/cn";

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[80rem] px-5 sm:px-8", className)}
      {...props}
    />
  );
}
