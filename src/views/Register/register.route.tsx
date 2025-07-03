/*imports*/
import { Routes } from "@/services/routes/routes.types";
import { lazy } from "react";

const Register = lazy(() => import("./register.view"));

export const registerRoutes: Routes[] = [
  {
    path: "/register",
    title: "Register",
    element: <Register />,
    navigationId: "accounts",
  },
];
