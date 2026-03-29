export interface Vendor {
  id: string;
  name: string;
  contact: string;
  email: string;
  rating: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  unit_price: number;
  stock_level: number;
  description?: string;
}

export type POStatus = "Draft" | "Confirmed" | "Shipped" | "Received" | "Cancelled";

export interface POLineItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
}

export interface PurchaseOrder {
  id: string;
  reference_no: string;
  vendor_id: string;
  vendor_name: string;
  items: POLineItem[];
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  status: POStatus;
  created_at: string;
}

export const TAX_RATE = 0.05;

export function calculateTotals(items: POLineItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.line_total, 0);
  const tax_amount = subtotal * TAX_RATE;
  const total_amount = subtotal + tax_amount;
  return { subtotal, tax_amount, total_amount };
}

export const mockVendors: Vendor[] = [
  { id: "v1", name: "Acme Industrial Supply", contact: "+1-555-0101", email: "sales@acmeindustrial.com", rating: 4.5, created_at: "2024-01-15" },
  { id: "v2", name: "GlobalTech Components", contact: "+1-555-0202", email: "orders@globaltech.com", rating: 4.8, created_at: "2024-02-10" },
  { id: "v3", name: "Prime Materials Co.", contact: "+1-555-0303", email: "info@primematerials.com", rating: 4.2, created_at: "2024-03-05" },
  { id: "v4", name: "EcoSource Green Supply", contact: "+1-555-0404", email: "procure@ecosource.com", rating: 3.9, created_at: "2024-04-20" },
  { id: "v5", name: "TitanWorks Manufacturing", contact: "+1-555-0505", email: "bulk@titanworks.com", rating: 4.7, created_at: "2024-05-12" },
];

export const mockProducts: Product[] = [
  { id: "p1", name: "Steel Bolt M10x40", sku: "SB-M10-40", category: "Fasteners", unit_price: 0.85, stock_level: 15000 },
  { id: "p2", name: "Copper Wire 2.5mm", sku: "CW-25-100", category: "Electrical", unit_price: 12.50, stock_level: 3200 },
  { id: "p3", name: "Hydraulic Cylinder 50mm", sku: "HC-50-200", category: "Hydraulics", unit_price: 245.00, stock_level: 120 },
  { id: "p4", name: "Industrial Bearing 6205", sku: "IB-6205-ZZ", category: "Bearings", unit_price: 8.75, stock_level: 5400 },
  { id: "p5", name: "PVC Pipe 4\" Schedule 40", sku: "PV-4-S40", category: "Plumbing", unit_price: 18.90, stock_level: 890 },
  { id: "p6", name: "LED Panel Light 600x600", sku: "LP-600-45W", category: "Electrical", unit_price: 32.00, stock_level: 640 },
  { id: "p7", name: "Pneumatic Valve 1/4\"", sku: "PNV-025-5W", category: "Pneumatics", unit_price: 67.50, stock_level: 310 },
  { id: "p8", name: "Carbon Steel Plate 6mm", sku: "CSP-6-1200", category: "Raw Materials", unit_price: 185.00, stock_level: 75 },
];

export const mockPurchaseOrders: PurchaseOrder[] = [
  {
    id: "po1", reference_no: "PO-2026-001", vendor_id: "v1", vendor_name: "Acme Industrial Supply",
    items: [
      { product_id: "p1", product_name: "Steel Bolt M10x40", quantity: 5000, unit_price: 0.85, line_total: 4250 },
      { product_id: "p4", product_name: "Industrial Bearing 6205", quantity: 200, unit_price: 8.75, line_total: 1750 },
    ],
    subtotal: 6000, tax_amount: 300, total_amount: 6300, status: "Confirmed", created_at: "2026-03-20",
  },
  {
    id: "po2", reference_no: "PO-2026-002", vendor_id: "v2", vendor_name: "GlobalTech Components",
    items: [
      { product_id: "p2", product_name: "Copper Wire 2.5mm", quantity: 500, unit_price: 12.50, line_total: 6250 },
      { product_id: "p6", product_name: "LED Panel Light 600x600", quantity: 100, unit_price: 32.00, line_total: 3200 },
    ],
    subtotal: 9450, tax_amount: 472.50, total_amount: 9922.50, status: "Shipped", created_at: "2026-03-22",
  },
  {
    id: "po3", reference_no: "PO-2026-003", vendor_id: "v5", vendor_name: "TitanWorks Manufacturing",
    items: [
      { product_id: "p3", product_name: "Hydraulic Cylinder 50mm", quantity: 20, unit_price: 245.00, line_total: 4900 },
      { product_id: "p8", product_name: "Carbon Steel Plate 6mm", quantity: 15, unit_price: 185.00, line_total: 2775 },
    ],
    subtotal: 7675, tax_amount: 383.75, total_amount: 8058.75, status: "Draft", created_at: "2026-03-28",
  },
  {
    id: "po4", reference_no: "PO-2026-004", vendor_id: "v3", vendor_name: "Prime Materials Co.",
    items: [
      { product_id: "p5", product_name: "PVC Pipe 4\" Schedule 40", quantity: 200, unit_price: 18.90, line_total: 3780 },
    ],
    subtotal: 3780, tax_amount: 189, total_amount: 3969, status: "Received", created_at: "2026-03-15",
  },
];
