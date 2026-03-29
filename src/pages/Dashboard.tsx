import { ShoppingCart, Package, Users, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import { mockPurchaseOrders, mockProducts, mockVendors } from "@/lib/mock-data";

export default function Dashboard() {
  const totalValue = mockPurchaseOrders.reduce((s, po) => s + po.total_amount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Purchase Order management overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ShoppingCart} title="Total Orders" value={String(mockPurchaseOrders.length)} subtitle="All time" />
        <StatCard icon={DollarSign} title="Total Value" value={`$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} subtitle="Across all POs" />
        <StatCard icon={Package} title="Products" value={String(mockProducts.length)} subtitle="In catalog" />
        <StatCard icon={Users} title="Vendors" value={String(mockVendors.length)} subtitle="Active suppliers" />
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="font-semibold">Recent Purchase Orders</h2>
          <Link to="/orders" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Reference</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Vendor</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-right font-medium text-muted-foreground">Total</th>
                <th className="px-6 py-3 text-left font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockPurchaseOrders.map((po) => (
                <tr key={po.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-primary">{po.reference_no}</td>
                  <td className="px-6 py-4">{po.vendor_name}</td>
                  <td className="px-6 py-4"><StatusBadge status={po.status} /></td>
                  <td className="px-6 py-4 text-right font-medium">${po.total_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4 text-muted-foreground">{po.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
