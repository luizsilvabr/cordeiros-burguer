import type { CartItem } from "../types";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function buildItemBlock(
  item: CartItem,
  getItemPrice: (item: CartItem) => number,
): string {
  const lines: string[] = [`${item.quantity}x ${item.name}`];

  if (item.selectedOptions.length > 0) {
    const optionsText = item.selectedOptions
      .map((option) => option.itemName)
      .join(", ");
    lines.push(`*Adicionais:* ${optionsText}`);
  }

  if (item.observation) {
    lines.push(`*Observações:* ${item.observation}`);
  }

  lines.push(formatBRL(getItemPrice(item)));

  return lines.join("\n");
}

export function buildOrderMessage(
  items: CartItem[],
  customerName: string,
  customerPhone: string,
  getItemPrice: (item: CartItem) => number,
  subtotal: number,
): string {
  const greeting = getGreeting();
  const header = `${greeting}, meu nome é *${customerName}*,\n*Contato:* ${customerPhone}`;
  const itemsBlock = items
    .map((item) => buildItemBlock(item, getItemPrice))
    .join("\n\n");
  const footer = `*Total:* ${formatBRL(subtotal)}`;

  return `${header}\n\n${itemsBlock}\n\n${footer}`;
}

export function getWhatsAppOrderUrl(message: string): string {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER;
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
}