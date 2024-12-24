import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Team from "../pages/Team/Team.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/team",
    element: <Team />,
  },
]);

export default router;
