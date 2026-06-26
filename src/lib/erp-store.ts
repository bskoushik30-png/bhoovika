import { useEffect, useState } from "react";

export type Category = { id: string; name: string; products: number; color: string };
export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  weight: string;
  price: number;
  mrp: number;
  cost: number;
  stock: number;
  minStock: number;
  maxStock: number;
  shelfLife: string;
  status: string;
  margin: number;
};
export type RawMaterial = {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  reserved: number;
  available: number;
  price: number;
  avgCost: number;
  supplier: string;
  minStock: number;
  location: string;
  expiry: string;
  batch: string;
  status: string;
};
export type Bom = {
  id: string;
  product: string;
  version: string;
  packageSize: string;
  batchOutput: number;
  ingredients: { name: string; qty: number; unit: string; cost: number }[];
  costs: Record<string, number>;
  sellingPrice: number;
};
export type ProductionBatch = {
  id: string;
  product: string;
  quantity: number;
  bomVersion: string;
  mfgDate: string;
  expiry: string;
  operator: string;
  status: string;
  cost: number;
};
export type Customer = { id: string; name: string; phone: string; email: string; gst: string; address: string; purchases: number; outstanding: number; credit: number };
export type Supplier = { id: string; name: string; phone: string; email: string; gst: string; address: string; products: number; purchases: number; pending: number };
export type PurchaseOrder = { id: string; supplier: string; date: string; expected: string; items: number; total: number; payment: string; status: string; receiving: string };
export type Sale = { id: string; customer: string; date: string; items: number; subtotal: number; gst: number; total: number; payment: string; status: string };
export type Expense = { id: string; date: string; category: string; description: string; amount: number; paidBy: string };
export type ActivityLog = { id: string; type: string; message: string; time: string; user: string };

export type ErpSnapshot = {
  categories: Category[];
  products: Product[];
  rawMaterials: RawMaterial[];
  boms: Bom[];
  productionBatches: ProductionBatch[];
  customers: Customer[];
  suppliers: Supplier[];
  purchaseOrders: PurchaseOrder[];
  sales: Sale[];
  expenses: Expense[];
  activities: ActivityLog[];
};

type CollectionName = keyof ErpSnapshot;

const colorPalette = ["#2E7D32", "#F59E0B", "#06B6D4", "#8B5CF6", "#EF4444", "#84CC16"];
const emptySnapshot: ErpSnapshot = {
  categories: [],
  products: [],
  rawMaterials: [],
  boms: [],
  productionBatches: [],
  customers: [],
  suppliers: [],
  purchaseOrders: [],
  sales: [],
  expenses: [],
  activities: [],
};

export const todayIso = () => new Date().toISOString().slice(0, 10);
export const fmtCurrency = (n: number) => "Rs. " + Math.round(n || 0).toLocaleString("en-IN");
export const createId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function fetchErpSnapshot() {
  return api<ErpSnapshot>("/api/erp");
}

async function createRecord<T extends { id: string }>(collection: CollectionName, record: T) {
  await api<{ ok: true }>(`/api/erp/${collection}`, {
    method: "POST",
    body: JSON.stringify(record),
  });
}

export function getProductStatus(stock: number, minStock: number) {
  if (stock <= 0) return "Out of Stock";
  if (stock < minStock) return "Low Stock";
  return "Active";
}

export function getRawMaterialStatus(quantity: number, minStock: number, expiry?: string) {
  if (quantity <= 0) return "Out of Stock";
  if (quantity < minStock) return "Low Stock";
  if (expiry) {
    const days = Math.ceil((new Date(expiry).getTime() - Date.now()) / 86400000);
    if (days >= 0 && days <= 30) return "Near Expiry";
  }
  return "In Stock";
}

export function getExpenseBreakdown(expenses: Expense[]) {
  const totals = expenses.reduce<Record<string, number>>((acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
    return acc;
  }, {});

  return Object.entries(totals).map(([name, value], index) => ({
    name,
    value,
    color: colorPalette[index % colorPalette.length],
  }));
}

export function getMonthlySales(sales: Sale[], expenses: Expense[]) {
  const totals = new Map<string, { month: string; sales: number; profit: number }>();

  for (const sale of sales) {
    const month = new Date(sale.date).toLocaleString("en-IN", { month: "short" });
    const current = totals.get(month) ?? { month, sales: 0, profit: 0 };
    current.sales += sale.total;
    current.profit += sale.total;
    totals.set(month, current);
  }

  for (const expense of expenses) {
    const month = new Date(expense.date).toLocaleString("en-IN", { month: "short" });
    const current = totals.get(month) ?? { month, sales: 0, profit: 0 };
    current.profit -= expense.amount;
    totals.set(month, current);
  }

  return Array.from(totals.values());
}

export function useErpData() {
  const [data, setData] = useState<ErpSnapshot>(emptySnapshot);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const snapshot = await fetchErpSnapshot();
        if (active) {
          setData(snapshot);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const appendRecord = async <K extends CollectionName>(collection: K, record: ErpSnapshot[K][number]) => {
    await createRecord(collection, record as { id: string });
    setData((current) => ({
      ...current,
      [collection]: [record, ...current[collection]],
    }));
  };

  const addActivity = async (type: string, message: string, user = "You") => {
    const activity: ActivityLog = { id: createId("ACT"), type, message, time: "Just now", user };
    await appendRecord("activities", activity);
  };

  return {
    ...data,
    loading,
    addCategory: (record: Category) => appendRecord("categories", record),
    addProduct: (record: Product) => appendRecord("products", record),
    addRawMaterial: (record: RawMaterial) => appendRecord("rawMaterials", record),
    addBom: (record: Bom) => appendRecord("boms", record),
    addProductionBatch: (record: ProductionBatch) => appendRecord("productionBatches", record),
    addCustomer: (record: Customer) => appendRecord("customers", record),
    addSupplier: (record: Supplier) => appendRecord("suppliers", record),
    addPurchaseOrder: (record: PurchaseOrder) => appendRecord("purchaseOrders", record),
    addSale: (record: Sale) => appendRecord("sales", record),
    addExpense: (record: Expense) => appendRecord("expenses", record),
    addActivity,
  };
}

export const notifications: { id: string; title: string; message: string; time: string }[] = [];
