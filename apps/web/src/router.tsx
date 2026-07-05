import { createBrowserRouter, Outlet } from "react-router";
import Cardapio from "./routes/cardapio/Cardapio";

// Layout público (cardápio)
const SiteLayout = () => {
  return (
    <div className="min-h-screen bg-[#171210]">
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
    {
        element: <SiteLayout />,
        children: [{path: "/", element: <Cardapio />}],
    },
]);