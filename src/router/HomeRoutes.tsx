import { Home, Page404, Setting, UserManagement } from "../components/pages";

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />,
  },
  {
    path: "/user_management",
    exact: false,
    children: <UserManagement />,
  },
  {
    path: "/setting",
    exact: false,
    children: <Setting />,
  },
  {
    path: "/*",
    exact: false,
    children: <Page404 />,
  },
];
