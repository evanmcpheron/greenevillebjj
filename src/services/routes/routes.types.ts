import { JSX } from "react";

export interface Routes {
  path: string;
  title: string;
  element: JSX.Element;
  navigationId: "none" | "dashboard" | "accounts" | "settings";
}
