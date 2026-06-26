import { i as __toESM } from "./_runtime.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { b as Leaf } from "./_libs/lucide-react.mjs";
import { t as PageHeader } from "./_ssr/page-header-BjVR05eH.mjs";
import { n as Label, t as Input } from "./_ssr/label-B7oQAA24.mjs";
import { n as SwitchThumb, t as Switch$1 } from "./_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.settings-BLxp4j4K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function Section({ title, desc, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-base font-semibold",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground mt-0.5",
				children: desc
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children
		})]
	});
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid sm:grid-cols-3 gap-3 items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-sm",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sm:col-span-2",
			children
		})]
	});
}
function SettingsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Settings",
			description: "Company details, invoice setup, taxes, and notifications."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Company",
					desc: "Shown on invoices and POs.",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-14 w-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-glow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-6 w-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								disabled: true,
								children: "Upload logo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Company name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "Your company name" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "GST number",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "GST number" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Address",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "Registered address" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Invoice & Tax",
					desc: "Defaults applied to new invoices.",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Invoice prefix",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "INV-" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Next invoice #",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "1" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Default GST %",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Currency",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "INR" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Notifications",
					desc: "Choose which alerts you want to receive.",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Low stock alerts",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Expiry warnings",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Production complete",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Payment reminders",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Appearance",
					desc: "Theme and density preferences.",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Dark mode",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Compact tables",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Show product images",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {})
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-end gap-2 mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				disabled: true,
				children: "Cancel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				disabled: true,
				children: "Save changes"
			})]
		})
	] });
}
//#endregion
export { SettingsPage as component };
