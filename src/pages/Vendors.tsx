import { Star } from "lucide-react";
import { mockVendors } from "@/lib/mock-data";

export default function Vendors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
        <p className="text-muted-foreground mt-1">Supplier directory and ratings</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockVendors.map((v) => (
          <div key={v.id} className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{v.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{v.email}</p>
                <p className="text-sm text-muted-foreground">{v.contact}</p>
              </div>
              <div className="flex items-center gap-1 rounded-full bg-warning/10 px-2.5 py-1">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                <span className="text-xs font-bold text-warning">{v.rating}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">Added {v.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
