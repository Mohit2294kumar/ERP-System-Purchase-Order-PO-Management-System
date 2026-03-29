import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockVendors, mockProducts, calculateTotals, TAX_RATE, type POLineItem } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

interface LineRow {
  key: number;
  product_id: string;
  quantity: number;
}

let rowKeyCounter = 1;

export default function CreatePurchaseOrder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vendorId, setVendorId] = useState("");
  const [rows, setRows] = useState<LineRow[]>([{ key: rowKeyCounter++, product_id: "", quantity: 1 }]);
  const [aiDescriptions, setAiDescriptions] = useState<Record<string, string>>({});
  const [loadingAi, setLoadingAi] = useState<Record<string, boolean>>({});

  const addRow = useCallback(() => {
    setRows((prev) => [...prev, { key: rowKeyCounter++, product_id: "", quantity: 1 }]);
  }, []);

  const removeRow = useCallback((key: number) => {
    setRows((prev) => prev.length > 1 ? prev.filter((r) => r.key !== key) : prev);
  }, []);

  const updateRow = useCallback((key: number, field: keyof Omit<LineRow, "key">, value: string | number) => {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, [field]: value } : r)));
  }, []);

  // Build line items for totals
  const lineItems: POLineItem[] = rows
    .filter((r) => r.product_id)
    .map((r) => {
      const prod = mockProducts.find((p) => p.id === r.product_id)!;
      const line_total = prod.unit_price * r.quantity;
      return { product_id: r.product_id, product_name: prod.name, quantity: r.quantity, unit_price: prod.unit_price, line_total };
    });

  const { subtotal, tax_amount, total_amount } = calculateTotals(lineItems);

  const generateDescription = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return;
    setLoadingAi((prev) => ({ ...prev, [productId]: true }));
    // Simulated AI description
    setTimeout(() => {
      const descriptions: Record<string, string> = {
        p1: "Precision-engineered M10x40 steel bolts built for heavy-duty industrial fastening. Corrosion-resistant and designed to withstand extreme torque in demanding environments.",
        p2: "High-conductivity 2.5mm copper wire ideal for electrical installations and power distribution. Meets international safety standards with excellent flexibility and durability.",
        p3: "Professional-grade 50mm hydraulic cylinder delivering reliable linear force for industrial machinery. Engineered for long service life with precision-machined components.",
        p4: "Premium 6205 deep groove ball bearing with ZZ shielding for reduced friction and maintenance. Perfect for high-speed rotating equipment and conveyor systems.",
        p5: "Durable 4-inch Schedule 40 PVC pipe for commercial plumbing and drainage applications. UV-resistant with smooth interior for optimal flow performance.",
        p6: "Energy-efficient 45W LED panel light with uniform 600x600mm illumination. Flicker-free output with 50,000-hour lifespan for commercial spaces.",
        p7: "Compact 1/4\" 5-way pneumatic valve for precise air flow control in automated systems. Quick-response solenoid operation with low power consumption.",
        p8: "Industrial-grade 6mm carbon steel plate suitable for structural fabrication and heavy equipment. Hot-rolled with excellent weldability and consistent thickness.",
      };
      setAiDescriptions((prev) => ({ ...prev, [productId]: descriptions[productId] || `Professional-grade ${product.name} designed for industrial applications. Manufactured to the highest quality standards for reliability and performance.` }));
      setLoadingAi((prev) => ({ ...prev, [productId]: false }));
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorId) {
      toast({ title: "Error", description: "Please select a vendor", variant: "destructive" });
      return;
    }
    if (lineItems.length === 0) {
      toast({ title: "Error", description: "Please add at least one product", variant: "destructive" });
      return;
    }
    toast({ title: "Purchase Order Created", description: `PO with ${lineItems.length} items totalling $${total_amount.toFixed(2)} has been created.` });
    navigate("/orders");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Purchase Order</h1>
        <p className="text-muted-foreground mt-1">Add vendor, products, and quantities to generate a new PO</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vendor Selection */}
        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-lg">Vendor Information</h2>
          <div className="max-w-sm">
            <Label htmlFor="vendor">Select Vendor</Label>
            <Select value={vendorId} onValueChange={setVendorId}>
              <SelectTrigger id="vendor" className="mt-1.5">
                <SelectValue placeholder="Choose a vendor..." />
              </SelectTrigger>
              <SelectContent>
                {mockVendors.map((v) => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.name} — ★ {v.rating}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Line Items */}
        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Order Items</h2>
            <Button type="button" variant="outline" size="sm" onClick={addRow}>
              <Plus className="mr-1 h-3.5 w-3.5" /> Add Row
            </Button>
          </div>

          <div className="space-y-3">
            {rows.map((row, idx) => {
              const product = mockProducts.find((p) => p.id === row.product_id);
              const lineTotal = product ? product.unit_price * row.quantity : 0;
              return (
                <div key={row.key} className="rounded-lg border bg-muted/30 p-4 space-y-3">
                  <div className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {idx + 1}
                    </span>
                    <div className="flex-1 grid gap-4 sm:grid-cols-[1fr_120px_120px]">
                      <div>
                        <Label>Product</Label>
                        <Select value={row.product_id} onValueChange={(v) => updateRow(row.key, "product_id", v)}>
                          <SelectTrigger className="mt-1.5">
                            <SelectValue placeholder="Select product..." />
                          </SelectTrigger>
                          <SelectContent>
                            {mockProducts.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name} — ${p.unit_price.toFixed(2)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          min={1}
                          className="mt-1.5"
                          value={row.quantity}
                          onChange={(e) => updateRow(row.key, "quantity", Math.max(1, parseInt(e.target.value) || 1))}
                        />
                      </div>
                      <div>
                        <Label>Line Total</Label>
                        <div className="mt-1.5 flex h-10 items-center rounded-md border bg-muted px-3 text-sm font-medium">
                          ${lineTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-6 text-destructive hover:text-destructive"
                      onClick={() => removeRow(row.key)}
                      disabled={rows.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* AI Description */}
                  {row.product_id && (
                    <div className="ml-11">
                      {aiDescriptions[row.product_id] ? (
                        <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                          {aiDescriptions[row.product_id]}
                        </p>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-primary"
                          disabled={loadingAi[row.product_id]}
                          onClick={() => generateDescription(row.product_id)}
                        >
                          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                          {loadingAi[row.product_id] ? "Generating..." : "Auto-Description"}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Totals */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm max-w-xs ml-auto">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
              <span className="font-medium">${tax_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-bold">
              <span>Total</span>
              <span className="text-primary">${total_amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/orders")}>Cancel</Button>
          <Button type="submit">Create Purchase Order</Button>
        </div>
      </form>
    </div>
  );
}
