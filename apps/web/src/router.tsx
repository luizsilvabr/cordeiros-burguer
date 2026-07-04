import { createBrowserRouter, Outlet } from "react-router";
import Cardapio from "./routes/cardapio/Cardapio";

// Layout público (cardápio)
const SiteLayout = () => {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#F3E9D2]">
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