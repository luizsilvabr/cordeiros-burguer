import { useState } from "react";
import { MinusIcon, PlusIcon, TrashIcon, XIcon } from "@phosphor-icons/react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useCartStore } from "../../stores/cartStore";
import { buildOrderMessage, getWhatsAppOrderUrl } from "../../lib/whatsapp";
import { formatPhoneNumber } from "../../lib/masks";

const OBSERVATION_LIMIT = 80;

export default function CarrinhoDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    getSubtotal,
    getItemPrice,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  } = useCartStore();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const isCustomerInfoComplete =
    customerName.trim().length > 0 && customerPhone.trim().length > 0;

  function handleSendOrder() {
    if (!isCustomerInfoComplete) return;

    const message = buildOrderMessage(
      items,
      customerName.trim(),
      customerPhone.trim(),
      getItemPrice,
      getSubtotal(),
    );
    const url = getWhatsAppOrderUrl(message);
    window.open(url, "_blank");

    clearCart();
    setCustomerName("");
    setCustomerPhone("");
    closeCart();
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeCart}
      />

      <aside
        className={`fixed top-0 right-0 h-screen w-[350px] bg-[#FBE9BC] z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between py-5 px-4">
          <h2 className="font-medium font-alfa text-[#171210]">MEU CARRINHO</h2>

          <button onClick={closeCart}>
            <XIcon
              className="text-[#171210] cursor-pointer"
              size={24}
              weight="bold"
            />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 cart-scroll">
          {items.length === 0 && (
            <p className="text-[#171210] text-center mt-10 font-inter">
              Seu carrinho está vazio
            </p>
          )}

          {items.map((item) => {
            const displayName =
              item.name.length > 20
                ? `${item.name.slice(0, 20)}...`
                : item.name;

            return (
              <div
                key={item.id}
                className="grid grid-cols-[80px_minmax(0,1fr)_auto] gap-3 items-center mb-5"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-[80px] h-[80px] object-cover rounded-[5px] self-start"
                />
                <div className="flex flex-wrap text-nowrap min-w-0">
                  <h2 className="font-medium font-alfa text-[#171210] w-full">
                    {displayName}
                  </h2>

                  {/* ADICIONAIS — um ao lado do outro, separados por vírgula */}
                  {item.selectedOptions.length > 0 && (
                    <p className="w-full text-[#5C5A52] font-inter text-[13px] truncate">
                      + {item.selectedOptions.map((o) => o.itemName).join(", ")}
                    </p>
                  )}

                  {item.observation && (() => {
                    const isTruncated =
                      item.observation.length > OBSERVATION_LIMIT;
                    const displayObservation = isTruncated
                      ? `${item.observation.slice(0, OBSERVATION_LIMIT)}...`
                      : item.observation;

                    const textEl = (
                      <p className="w-full text-[#5C5A52] font-inter text-[13px] italic whitespace-normal break-words">
                        Obs: {displayObservation}
                      </p>
                    );

                    return isTruncated ? (
                      <Tippy
                        content={item.observation}
                        theme="carrinho"
                        appendTo={() => document.body}
                      >
                        {textEl}
                      </Tippy>
                    ) : (
                      textEl
                    );
                  })()}

                  <p className="text-[#5C5A52] font-inter w-full">
                    {getItemPrice(item).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>

                  <div className="flex justify-between gap-3 items-center">
                    <button
                      onClick={() => decrementItem(item.id)}
                      className="flex items-center bg-[#6B3B1F] text-[#F3E9D2] rounded-[5px] px-2 py-1 gap-2 mt-2 cursor-pointer"
                    >
                      <MinusIcon weight="bold" size={15} />
                    </button>
                    <span className="mt-2 font-inter text-[#171210]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementItem(item.id)}
                      className="flex items-center bg-[#6B3B1F] text-[#F3E9D2] rounded-[5px] px-2 py-1 gap-2 mt-2 cursor-pointer"
                    >
                      <PlusIcon weight="bold" size={15} />
                    </button>
                  </div>
                </div>
                <TrashIcon
                  size={25}
                  className="cursor-pointer"
                  onClick={() => removeItem(item.id)}
                />
              </div>
            );
          })}
        </div>
        <div className="p-4">
          <div className="mb-3 font-inter  border-t border-[#171210]/20">
            <div className="flex justify-between mt-4">
              <span className="text-[#171210] font-bold">Subtotal</span>
              <span className="text-[#171210] font-bold">
                {getSubtotal().toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          </div>

          {/* DADOS DO CLIENTE — vão junto na mensagem do WhatsApp */}
          <div className="flex flex-col gap-2 mb-3">
            <input
              type="text"
              placeholder="Seu nome"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full rounded-[5px] border border-[#171210]/30 bg-white px-3 py-2 text-[#171210] font-inter text-[14px] placeholder:text-[#5C5A52]"
            />
            <input
              type="tel"
              placeholder="Seu contato (WhatsApp)"
              value={customerPhone}
              onChange={(e) =>
                setCustomerPhone(formatPhoneNumber(e.target.value))
              }
              maxLength={15}
              className="w-full rounded-[5px] border border-[#171210]/30 bg-white px-3 py-2 text-[#171210] font-inter text-[14px] placeholder:text-[#5C5A52]"
            />
          </div>

          <button
            disabled={items.length === 0 || !isCustomerInfoComplete}
            onClick={handleSendOrder}
            className="w-full bg-green-600 disabled:bg-green-600/40 text-white rounded-[5px] py-3 font-inter font-bold cursor-pointer hover:bg-green-700 transition-colors disabled:cursor-not-allowed"
          >
            Enviar Pedido
          </button>
        </div>
      </aside>
    </>
  );
}