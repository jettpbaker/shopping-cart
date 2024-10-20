import Root from "./Root";
import Home from "./Home";
import Store from "./Store";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: "true",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "store",
        element: <Store />,
      },
    ],
  },
];

export default routes;
