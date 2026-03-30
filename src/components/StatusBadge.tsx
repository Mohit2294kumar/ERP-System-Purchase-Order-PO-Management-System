import type { POStatus } from "@/lib/mock-data";

const statusStyles: Record<POStatus, string> = {
  Draft: "bg-muted text-muted-foreground",
  Confirmed: "bg-primary/10 text-primary",
  Shipped: "bg-warning/10 text-warning",
  Received: "bg-success/10 text-success",
  Cancelled: "bg-destructive/10 text-destructive",
};
  
export default function StatusBadge({ status }: { status: POStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
