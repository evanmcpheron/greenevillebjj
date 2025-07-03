import { defaultRoutes } from "./routes.main";

export const getRouteNavigationId = (path: string): string | undefined => {
  const matchingRoute = defaultRoutes.find((route) => {
    const routeRegex = new RegExp(`^${route.path.replace(/:\w+/g, "[^/]+")}$`);
    return routeRegex.test(path);
  });

  return matchingRoute?.navigationId;
};
