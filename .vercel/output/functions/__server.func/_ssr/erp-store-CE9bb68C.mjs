import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/erp-store-CE9bb68C.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var colorPalette = [
	"#2E7D32",
	"#F59E0B",
	"#06B6D4",
	"#8B5CF6",
	"#EF4444",
	"#84CC16"
];
var emptySnapshot = {
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
	activities: []
};
var todayIso = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
var fmtCurrency = (n) => "Rs. " + Math.round(n || 0).toLocaleString("en-IN");
var createId = (prefix) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
async function api(path, init) {
	const response = await fetch(path, {
		credentials: "include",
		headers: {
			"content-type": "application/json",
			...init?.headers ?? {}
		},
		...init
	});
	if (!response.ok) {
		const text = await response.text();
		throw new Error(text || `Request failed: ${response.status}`);
	}
	return await response.json();
}
async function fetchErpSnapshot() {
	return api("/api/erp");
}
async function createRecord(collection, record) {
	await api(`/api/erp/${collection}`, {
		method: "POST",
		body: JSON.stringify(record)
	});
}
function getProductStatus(stock, minStock) {
	if (stock <= 0) return "Out of Stock";
	if (stock < minStock) return "Low Stock";
	return "Active";
}
function getRawMaterialStatus(quantity, minStock, expiry) {
	if (quantity <= 0) return "Out of Stock";
	if (quantity < minStock) return "Low Stock";
	if (expiry) {
		const days = Math.ceil((new Date(expiry).getTime() - Date.now()) / 864e5);
		if (days >= 0 && days <= 30) return "Near Expiry";
	}
	return "In Stock";
}
function getExpenseBreakdown(expenses) {
	const totals = expenses.reduce((acc, expense) => {
		acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
		return acc;
	}, {});
	return Object.entries(totals).map(([name, value], index) => ({
		name,
		value,
		color: colorPalette[index % colorPalette.length]
	}));
}
function getMonthlySales(sales, expenses) {
	const totals = /* @__PURE__ */ new Map();
	for (const sale of sales) {
		const month = new Date(sale.date).toLocaleString("en-IN", { month: "short" });
		const current = totals.get(month) ?? {
			month,
			sales: 0,
			profit: 0
		};
		current.sales += sale.total;
		current.profit += sale.total;
		totals.set(month, current);
	}
	for (const expense of expenses) {
		const month = new Date(expense.date).toLocaleString("en-IN", { month: "short" });
		const current = totals.get(month) ?? {
			month,
			sales: 0,
			profit: 0
		};
		current.profit -= expense.amount;
		totals.set(month, current);
	}
	return Array.from(totals.values());
}
function useErpData() {
	const [data, setData] = (0, import_react.useState)(emptySnapshot);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let active = true;
		const load = async () => {
			try {
				const snapshot = await fetchErpSnapshot();
				if (active) setData(snapshot);
			} catch (error) {
				console.error(error);
			} finally {
				if (active) setLoading(false);
			}
		};
		load();
		return () => {
			active = false;
		};
	}, []);
	const appendRecord = async (collection, record) => {
		await createRecord(collection, record);
		setData((current) => ({
			...current,
			[collection]: [record, ...current[collection]]
		}));
	};
	const addActivity = async (type, message, user = "You") => {
		await appendRecord("activities", {
			id: createId("ACT"),
			type,
			message,
			time: "Just now",
			user
		});
	};
	return {
		...data,
		loading,
		addCategory: (record) => appendRecord("categories", record),
		addProduct: (record) => appendRecord("products", record),
		addRawMaterial: (record) => appendRecord("rawMaterials", record),
		addBom: (record) => appendRecord("boms", record),
		addProductionBatch: (record) => appendRecord("productionBatches", record),
		addCustomer: (record) => appendRecord("customers", record),
		addSupplier: (record) => appendRecord("suppliers", record),
		addPurchaseOrder: (record) => appendRecord("purchaseOrders", record),
		addSale: (record) => appendRecord("sales", record),
		addExpense: (record) => appendRecord("expenses", record),
		addActivity
	};
}
//#endregion
export { getProductStatus as a, useErpData as c, getMonthlySales as i, fmtCurrency as n, getRawMaterialStatus as o, getExpenseBreakdown as r, todayIso as s, createId as t };
