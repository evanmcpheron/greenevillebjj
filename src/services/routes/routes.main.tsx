/*imports*/

import { loginRoutes } from "@/views/Login/login.route";
import { Routes } from "./routes.types";
import { newMemberRoutes } from "@/views/NewMember/new.members.route";
import { registerRoutes } from "@/views/Register/register.route";
import { checkInRoutes } from "@/views/Checkin/checkin.route";
import { membersRoutes } from "@/views/Members/members.route";

export const defaultRoutes: Routes[] = [
  ...newMemberRoutes,
  ...loginRoutes,
  ...registerRoutes,
  ...checkInRoutes,
  ...membersRoutes,
  {
    path: "*",
    title: "404 - Not Found",
    element: <div>Page Not Found</div>,
    navigationId: "none",
  },
];
