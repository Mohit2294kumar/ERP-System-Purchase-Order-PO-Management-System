import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import { mockPurchaseOrders } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function PurchaseOrders() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground mt-1">Manage and track all purchase orders</p>
        </div>
        <Link to="/orders/new">
          <Button><Plus className="mr-2 h-4 w-4" /> Create PO</Button>
        </Link>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Reference</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Vendor</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Items</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">Subtotal</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">Tax (5%)</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">Total</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockPurchaseOrders.map((po) => (
              <tr key={po.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono font-medium text-primary">{po.reference_no}</td>
                <td className="px-6 py-4">{po.vendor_name}</td>
                <td className="px-6 py-4">{po.items.length} item(s)</td>
                <td className="px-6 py-4"><StatusBadge status={po.status} /></td>
                <td className="px-6 py-4 text-right">${po.subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                <td className="px-6 py-4 text-right text-muted-foreground">${po.tax_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                <td className="px-6 py-4 text-right font-semibold">${po.total_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                <td className="px-6 py-4 text-muted-foreground">{po.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
