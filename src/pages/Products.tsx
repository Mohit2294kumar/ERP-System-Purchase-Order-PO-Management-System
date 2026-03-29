import { mockProducts } from "@/lib/mock-data";

export default function Products() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground mt-1">Product catalog with SKU and stock information</p>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">SKU</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Product Name</th>
              <th className="px-6 py-3 text-left font-medium text-muted-foreground">Category</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">Unit Price</th>
              <th className="px-6 py-3 text-right font-medium text-muted-foreground">Stock Level</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((p) => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{p.sku}</td>
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">{p.category}</span>
                </td>
                <td className="px-6 py-4 text-right font-medium">${p.unit_price.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <span className={p.stock_level < 200 ? "text-warning font-semibold" : ""}>
                    {p.stock_level.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
