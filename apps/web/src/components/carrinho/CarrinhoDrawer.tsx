import { XIcon } from "@phosphor-icons/react";

export default function CarrinhoDrawer() {
  return (
    <>
      {/* Camada 2 — overlay escuro */}
      <div className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={toggleCart} />

      <aside className="fixed top-0 right-0 h-screen w-[320px] bg-[#FBE9BC] z-50 flex flex-col">

        <div className="flex items-center justify-between py-5 px-6">
          <button>
            <XIcon className="text-[#171210]" size={24} weight="bold" />
          </button>
          <h2 className="font-medium font-alfa text-[#171210]">MEU CARRINHO</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4">
          {/* itens do carrinho aqui */}
        </div>

        <div className="p-4">
          <button className="w-full bg-green-600 text-white rounded-[5px] py-3 font-inter font-bold">
            Enviar Pedido
          </button>
        </div>
      </aside>
    </>
  );
}
