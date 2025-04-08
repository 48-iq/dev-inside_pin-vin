import { createBrowserRouter } from "react-router-dom";
import { WelcomePage } from "../pages/welcome";
import { DashboardPage } from "../pages/dashboard";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  }
])