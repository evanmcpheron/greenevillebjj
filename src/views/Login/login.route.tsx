/*imports*/
import { Routes } from "@/services/routes/routes.types";
import { lazy } from "react";

const Login = lazy(() => import("./login.view"));

export const loginRoutes: Routes[] = [
  {
    path: "/login",
    title: "Login",
    element: <Login />,
    navigationId: "accounts",
  },
];
