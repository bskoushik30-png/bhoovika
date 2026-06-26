import { i as __toESM } from "../_runtime.mjs";
import { i as signIn, n as AUTH_NAME, r as fetchSession, t as AUTH_EMAIL } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { N as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Mail, b as Leaf, y as LockKeyhole } from "../_libs/lucide-react.mjs";
import { n as Label, t as Input } from "./label-B7oQAA24.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-7EDqvmW4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)(AUTH_EMAIL);
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		fetchSession().then((session) => {
			if (active && session) navigate({
				to: "/",
				replace: true
			});
		}).catch(() => void 0);
		return () => {
			active = false;
		};
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(74,124,89,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(205,150,52,0.18),_transparent_35%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-2xl border border-border bg-card/95 p-8 shadow-soft backdrop-blur",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-glow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: AUTH_NAME
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Sign in to access your ERP workspace"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-5",
				onSubmit: async (event) => {
					event.preventDefault();
					setSubmitting(true);
					setError("");
					try {
						await signIn(email, password);
						navigate({
							to: "/",
							replace: true
						});
					} catch (submitError) {
						setError(submitError instanceof Error ? submitError.message : "Login failed");
					} finally {
						setSubmitting(false);
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "pl-9",
								placeholder: AUTH_EMAIL
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								required: true,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "pl-9",
								placeholder: "Enter your password"
							})]
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "h-10 w-full",
						disabled: submitting,
						children: submitting ? "Signing in..." : "Sign in"
					})
				]
			})]
		})]
	});
}
//#endregion
export { LoginPage as component };
