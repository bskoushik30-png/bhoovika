import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { c as useErpData, n as fmtCurrency, t as createId } from "./_ssr/erp-store-CE9bb68C.mjs";
import { _ as Mail, m as Phone } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { t as RecordDialog } from "./_ssr/record-dialog-DFVuCVPe.mjs";
import { t as DataTable } from "./_ssr/data-table-Dtd-v00R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.customers-2Ni250KR.js
var import_jsx_runtime = require_jsx_runtime();
function initials(name) {
	return name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}
function CustomersPage() {
	const { customers, addCustomer, addActivity } = useErpData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Customers",
		description: "Buyers, outstanding balances, and purchase history.",
		showFilter: true,
		showExport: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordDialog, {
			title: "Add customer",
			triggerLabel: "Add customer",
			fields: [
				{
					name: "name",
					label: "Customer name",
					required: true
				},
				{
					name: "phone",
					label: "Phone",
					type: "tel"
				},
				{
					name: "email",
					label: "Email",
					type: "email"
				},
				{
					name: "gst",
					label: "GST number"
				},
				{
					name: "address",
					label: "Address",
					type: "textarea"
				},
				{
					name: "credit",
					label: "Credit limit",
					type: "number",
					defaultValue: 0
				}
			],
			onSubmit: (values) => {
				const customer = {
					id: createId("CUS"),
					name: String(values.name),
					phone: String(values.phone),
					email: String(values.email),
					gst: String(values.gst),
					address: String(values.address),
					purchases: 0,
					outstanding: 0,
					credit: Number(values.credit)
				};
				addCustomer(customer);
				addActivity("Sale", `${customer.name} added as customer`);
			}
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
		columns: [
			{
				key: "name",
				header: "Customer",
				render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground text-xs font-semibold",
						children: initials(c.name)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-medium",
						children: c.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: c.address
					})] })]
				})
			},
			{
				key: "contact",
				header: "Contact",
				render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-0.5 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }), c.phone]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3 w-3" }), c.email]
					})]
				})
			},
			{
				key: "gst",
				header: "GST",
				render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-xs",
					children: c.gst
				})
			},
			{
				key: "purchases",
				header: "Purchases",
				align: "right",
				render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium tabular-nums",
					children: fmtCurrency(c.purchases)
				})
			},
			{
				key: "outstanding",
				header: "Outstanding",
				align: "right",
				render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: c.outstanding > 0 ? "text-warning-foreground tabular-nums" : "text-muted-foreground tabular-nums",
					children: fmtCurrency(c.outstanding)
				})
			},
			{
				key: "credit",
				header: "Credit Limit",
				align: "right",
				render: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground tabular-nums",
					children: fmtCurrency(c.credit)
				})
			}
		],
		rows: customers,
		empty: "No customers yet. Add customers before creating invoices."
	})] });
}
//#endregion
export { CustomersPage as component };
