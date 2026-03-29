ERP System Project Explanation
What the Project Does
This is a frontend-only Enterprise Resource Planning (ERP) system focused on Purchase Order (PO) management. It's designed to help businesses manage their procurement process by:

Dashboard Overview: Shows key metrics like total orders, total value, number of products, and active vendors
Product Catalog: Manage inventory items with details like SKU, category, unit price, and stock levels
Vendor Management: Track suppliers with contact info, ratings, and performance
Purchase Order Creation: Create new POs by selecting vendors and adding product line items
PO Tracking: View all purchase orders with status tracking (Draft → Confirmed → Shipped → Received)
Order Analytics: Calculate subtotals, taxes, and totals automatically

The app uses mock data for demonstration purposes, making it a prototype/demo system rather than a production application.

Technology Stack
Frontend Framework:

React 18 with TypeScript for type-safe component development
Vite as the build tool and dev server
React Router for client-side routing
Styling & UI:

Tailwind CSS for utility-first styling
shadcn/ui component library (built on Radix UI primitives)
Lucide React for consistent iconography

Forms & Data:

React Hook Form with Zod validation for robust form handling
TanStack Query for data fetching (currently using mock data)
date-fns for date manipulation
Development & Testing:

Bun as the package manager (faster than npm/yarn)
Vitest for unit testing
Playwright for end-to-end testing
ESLint with TypeScript rules for code quality
Create Purchase Order Flow
The PO creation process is handled in CreatePurchaseOrder.tsx and follows this workflow:
Vendor Selection

User selects a vendor from a dropdown showing vendor names and ratings
Form validation requires a vendor to be selected
Adding Line Items

Start with one empty row, can add multiple rows with "Add Row" button
Each row contains:
Product dropdown (shows product name and unit price)
Quantity input (minimum 1)
Auto-calculated line total
Remove button (disabled if only one row)
AI-Generated Descriptions (Optional Feature)

For each selected product, user can click "Auto-Description" button
Simulates AI by showing pre-written professional descriptions
Shows loading state during "generation"
Order Summary Calculation

Subtotal: Sum of all line totals
Tax: 5% of subtotal (configurable TAX_RATE)
Total: Subtotal + Tax
All amounts formatted with proper currency display
Form Submission

Validates that vendor is selected and at least one product is added
Shows success toast with order summary
Redirects to /orders page to view all POs
In a real app, this would save to a database

Key Code Features:

Uses React state management with useState for form data
useCallback for performance optimization of row operations
Mock data integration from mock-data.ts
Toast notifications for user feedback
Responsive design with Tailwind grid system
The flow demonstrates modern React patterns with proper form handling, validation, and user experience considerations typical of enterprise applications.