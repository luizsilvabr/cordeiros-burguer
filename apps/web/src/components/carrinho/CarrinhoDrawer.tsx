import { XIcon } from "@phosphor-icons/react";
import { useCartStore } from "../../stores/cartStore";

export default function CarrinhoDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    getSubtotal,
  } = useCartStore();
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
      />

      <aside
        className={`fixed top-0 right-0 h-screen w-[320px] bg-[#FBE9BC] z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {" "}
        <div className="flex items-center justify-between py-5 px-6">
          <h2 className="font-medium font-alfa text-[#171210]">MEU CARRINHO</h2>

          <button onClick={closeCart}>
            <XIcon className="text-[#171210] cursor-pointer" size={24} weight="bold" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 && (
            <p className="text-[#171210] text-center mt-10 font-inter">
              Seu carrinho está vazio
            </p>
          )}

          {items.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </div>
        <div className="p-4">
          <div className="mb-3 font-inter  border-t border-[#171210]/20">
            <div className="flex justify-between mt-4">
              <span className="text-[#171210] font-bold">Subtotal</span>
              <span className="text-[#171210] font-bold">
                R$ {getSubtotal().toFixed(2)}
              </span>
            </div>
          </div>
          <button
            disabled={items.length === 0}
            className="w-full bg-green-600 disabled:bg-green-600/40 text-white rounded-[5px] py-3 font-inter font-bold"
          >
            Enviar Pedido
          </button>
        </div>
      </aside>
    </>
  );
}
