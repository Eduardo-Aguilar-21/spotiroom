import Auth from "./auth/auth";
import { Home } from "./pages/home";
import Callback from "./auth/callback";

export const routes = [
  { path: "/", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/auth", component: <Auth /> },
  { path: "/callback", component: <Callback /> },
];
