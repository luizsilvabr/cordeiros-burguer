import { useEffect, useState } from "react";
import { CheckIcon, XIcon } from "@phosphor-icons/react";
import type { Product, SelectedOption } from "../../types";
import { useCartStore } from "../../stores/cartStore";

interface ProdutoModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

type GroupSelection = string | string[] | null;
const TRANSITION_MS = 200;

export default function ProdutoModal({
  product,
  isOpen,
  onClose,
}: ProdutoModalProps) {
  const addItem = useCartStore((state) => state.addItem);

  const [selections, setSelections] = useState<Record<string, GroupSelection>>(
    {},
  );
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState("");
  const [missingGroups, setMissingGroups] = useState<string[]>([]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  function handleClose() {
    setIsVisible(false);
    setTimeout(onClose, TRANSITION_MS);
  }

  if (!isOpen) return null;

  function handleSingleSelect(groupId: string, itemId: string) {
    setSelections((prev) => ({ ...prev, [groupId]: itemId }));
  }

  function handleMultipleToggle(groupId: string, itemId: string) {
    setSelections((prev) => {
      const current = (prev[groupId] as string[]) ?? [];
      const next = current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId];
      return { ...prev, [groupId]: next };
    });
  }

  function buildSelectedOptions(): SelectedOption[] {
    const selected: SelectedOption[] = [];
    for (const group of product.optionGroups) {
      const selection = selections[group.id];
      const itemIds = Array.isArray(selection)
        ? selection
        : selection
          ? [selection]
          : [];
      for (const itemId of itemIds) {
        const item = group.items.find((i) => i.id === itemId);
        if (!item) continue;
        selected.push({
          groupId: group.id,
          groupName: group.name,
          itemId: item.id,
          itemName: item.name,
          extraPrice: item.extraPrice,
        });
      }
    }
    return selected;
  }

  function validate(): boolean {
    const missing = product.optionGroups
      .filter((group) => group.required)
      .filter((group) => {
        const selection = selections[group.id];
        return Array.isArray(selection) ? selection.length === 0 : !selection;
      })
      .map((group) => group.name);
    setMissingGroups(missing);
    return missing.length === 0;
  }

  function handleAddToCart() {
    if (!validate()) return;
    addItem({
      productId: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      basePrice: product.price,
      quantity,
      selectedOptions: buildSelectedOptions(),
      observation: observation.trim() || undefined,
    });
    handleClose();
  }

  const optionsTotal = buildSelectedOptions().reduce(
    (sum, opt) => sum + opt.extraPrice,
    0,
  );
  const totalPrice = (product.price + optionsTotal) * quantity;

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  // SINGLE sempre antes de MULTIPLE, sem mexer na ordem entre grupos do mesmo tipo
  const sortedGroups = [...product.optionGroups].sort((a, b) =>
    a.type === b.type ? 0 : a.type === "SINGLE" ? -1 : 1,
  );

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-[#171210] rounded-[5px] w-[700px] max-h-[90vh] overflow-y-auto bg-[#FBE9BC] transition-all duration-200 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-end pt-3 px-4">
          <XIcon
            className="text-[#171210] cursor-pointer"
            size={24}
            weight="bold"
            onClick={handleClose}
          />
        </div>

        {/* BODY */}
        <section className="py-6 px-8">
          <div className="flex justify-between gap-2">
            <div>
              <h3 className="text-[#171210] font-alfa text-[20px]">
                {product.name.toUpperCase()}
              </h3>
              <p className="text-[#5C5A52] text-[17px] mt-1 font-inter">
                {product.description}
              </p>
            </div>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-[230px] h-[200px] object-cover rounded-[5px]"
            />
          </div>

          {sortedGroups.map((group) =>
            group.type === "SINGLE" ? (
              // GROUPS [SINGLE]
              <div key={group.id} className="mt-6">
                <h4 className="text-[#171210] font-inter text-[19px] font-semibold">
                  {group.name}
                  {group.required && <span className="text-[#C81D25]"> *</span>}
                </h4>
                <div className="flex items-center gap-6 bg-[#FBE9BC] rounded-full py-3 w-fit flex-wrap">
                  {group.items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={group.id}
                        value={item.id}
                        checked={selections[group.id] === item.id}
                        onChange={() => handleSingleSelect(group.id, item.id)}
                        className="peer hidden"
                      />
                      <span className="w-4 h-4 rounded-full border-2 border-[#3A2317] peer-checked:bg-[#3A2317] peer-checked:shadow-[inset_0_0_0_1px_#FBE9BC] transition-all" />
                      <span className="text-[#5C5A52] font-inter text-[16px]">
                        {item.name}
                        {item.extraPrice > 0 && (
                          <span className="text-[#3A2317]">
                            {" "}
                            (+ {formatBRL(item.extraPrice)})
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              // GROUPS [MULTIPLE]
              <div key={group.id} className="mt-6">
                <h4 className="text-[#171210] font-inter text-[19px] font-semibold">
                  {group.name}
                  {group.required && <span className="text-[#C81D25]"> *</span>}
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 mt-3">
                  {group.items.map((item) => {
                    const isChecked = (
                      (selections[group.id] as string[]) ?? []
                    ).includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className="flex items-center gap-2 cursor-pointer justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative w-4 h-4 shrink-0">
                            <input
                              type="checkbox"
                              value={item.id}
                              checked={isChecked}
                              onChange={() =>
                                handleMultipleToggle(group.id, item.id)
                              }
                              className="peer hidden"
                            />
                            <span className="absolute inset-0 rounded-[4px] border-2 border-[#3A2317] peer-checked:bg-[#3A2317] transition-colors" />
                            <CheckIcon
                              weight="bold"
                              className="absolute inset-0 m-auto text-[#FBE9BC] w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity"
                            />
                          </div>
                          <span className="text-[#5C5A52] font-inter text-[16px]">
                            {item.name}
                          </span>
                        </div>
                        <span className="text-[#3A2317] font-inter text-[16px] font-semibold">
                          {formatBRL(item.extraPrice)}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ),
          )}

          {/* OBSERVAÇÕES */}
          <div className="mt-6">
            <h4 className="text-[#171210] font-inter text-[19px] font-semibold">
              Observação
            </h4>
            <textarea
              className="w-full mt-1 p-2 border-1 border-[#3A2317] rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-[#3A2317] focus:border-[#3A2317] font-inter text-[16px]"
              rows={4}
              placeholder="Digite suas observações aqui..."
              value={observation}
              maxLength={150}
              onChange={(e) => setObservation(e.target.value)}
            />
          </div>

          {missingGroups.length > 0 && (
            <div className="mt-4 bg-[#8B1A20]/10 p-3 rounded-md text-center font-bold">
              {missingGroups.map((groupName) => (
                <p
                  key={groupName}
                  className="text-[#C81D25] font-inter text-[14px]"
                >
                  Selecione uma opção em "{groupName}"
                </p>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <div className="flex items-center justify-end py-6 px-8 border-[#171210]/20">
          <button
            onClick={handleAddToCart}
            className="w-[210px] bg-green-600 disabled:bg-green-600/40 text-white rounded-[5px] py-2 font-inter font-bold hover:bg-green-700 transition-colors cursor-pointer"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
