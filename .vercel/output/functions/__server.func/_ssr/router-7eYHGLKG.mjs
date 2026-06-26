import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { P as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-7eYHGLKG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-jsvxoLOg.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "Lovable Generated Project"
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "Lovable Generated Project"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$16 = () => import("./login-7EDqvmW4.mjs");
var Route$16 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Login - Bhoovika Enterprises ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("../_app-w3KUXOHT.mjs");
var Route$15 = createFileRoute("/_app")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("../_app.index-OTtLH27b.mjs");
var Route$14 = createFileRoute("/_app/")({
	head: () => ({ meta: [{ title: "Dashboard - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("../_app.suppliers-kKPurKJp.mjs");
var Route$13 = createFileRoute("/_app/suppliers")({
	head: () => ({ meta: [{ title: "Suppliers - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("../_app.settings-BLxp4j4K.mjs");
var Route$12 = createFileRoute("/_app/settings")({
	head: () => ({ meta: [{ title: "Settings - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("../_app.sales-C1t4LVrK.mjs");
var Route$11 = createFileRoute("/_app/sales")({
	head: () => ({ meta: [{ title: "Sales - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_app.reports-C7-yz2cr.mjs");
var Route$10 = createFileRoute("/_app/reports")({
	head: () => ({ meta: [{ title: "Reports — PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_app.raw-materials-CFqdLmcZ.mjs");
var Route$9 = createFileRoute("/_app/raw-materials")({
	head: () => ({ meta: [{ title: "Raw Materials - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_app.purchase-orders-D0cq-6DC.mjs");
var Route$8 = createFileRoute("/_app/purchase-orders")({
	head: () => ({ meta: [{ title: "Purchase Orders - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_app.products-Beh5TJ4m.mjs");
var Route$7 = createFileRoute("/_app/products")({
	head: () => ({ meta: [{ title: "Products - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_app.production-BdcA85yz.mjs");
var Route$6 = createFileRoute("/_app/production")({
	head: () => ({ meta: [{ title: "Production - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_app.inventory-uQsOlqCQ.mjs");
var Route$5 = createFileRoute("/_app/inventory")({
	head: () => ({ meta: [{ title: "Inventory - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_app.expenses-CdNz81HV.mjs");
var Route$4 = createFileRoute("/_app/expenses")({
	head: () => ({ meta: [{ title: "Expenses - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_app.customers-2Ni250KR.mjs");
var Route$3 = createFileRoute("/_app/customers")({
	head: () => ({ meta: [{ title: "Customers - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_app.categories-DXzOJoWU.mjs");
var Route$2 = createFileRoute("/_app/categories")({
	head: () => ({ meta: [{ title: "Categories - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_app.bom-C6LNZpwp.mjs");
var Route$1 = createFileRoute("/_app/bom")({
	head: () => ({ meta: [{ title: "Bill of Materials - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_app.activity-D2Ulxstp.mjs");
var Route = createFileRoute("/_app/activity")({
	head: () => ({ meta: [{ title: "Activity Logs - PureHarvest ERP" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var LoginRoute = Route$16.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$17
});
var AppRoute = Route$15.update({
	id: "/_app",
	getParentRoute: () => Route$17
});
var AppIndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppSuppliersRoute = Route$13.update({
	id: "/suppliers",
	path: "/suppliers",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$12.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppSalesRoute = Route$11.update({
	id: "/sales",
	path: "/sales",
	getParentRoute: () => AppRoute
});
var AppReportsRoute = Route$10.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AppRoute
});
var AppRawMaterialsRoute = Route$9.update({
	id: "/raw-materials",
	path: "/raw-materials",
	getParentRoute: () => AppRoute
});
var AppPurchaseOrdersRoute = Route$8.update({
	id: "/purchase-orders",
	path: "/purchase-orders",
	getParentRoute: () => AppRoute
});
var AppProductsRoute = Route$7.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => AppRoute
});
var AppProductionRoute = Route$6.update({
	id: "/production",
	path: "/production",
	getParentRoute: () => AppRoute
});
var AppInventoryRoute = Route$5.update({
	id: "/inventory",
	path: "/inventory",
	getParentRoute: () => AppRoute
});
var AppExpensesRoute = Route$4.update({
	id: "/expenses",
	path: "/expenses",
	getParentRoute: () => AppRoute
});
var AppCustomersRoute = Route$3.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => AppRoute
});
var AppCategoriesRoute = Route$2.update({
	id: "/categories",
	path: "/categories",
	getParentRoute: () => AppRoute
});
var AppBomRoute = Route$1.update({
	id: "/bom",
	path: "/bom",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppActivityRoute: Route.update({
		id: "/activity",
		path: "/activity",
		getParentRoute: () => AppRoute
	}),
	AppBomRoute,
	AppCategoriesRoute,
	AppCustomersRoute,
	AppExpensesRoute,
	AppInventoryRoute,
	AppProductionRoute,
	AppProductsRoute,
	AppPurchaseOrdersRoute,
	AppRawMaterialsRoute,
	AppReportsRoute,
	AppSalesRoute,
	AppSettingsRoute,
	AppSuppliersRoute,
	AppIndexRoute
};
var rootRouteChildren = {
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	LoginRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
