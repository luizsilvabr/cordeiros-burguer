// apps/web/src/types/index.ts

export interface ProductOptionItem {
  id: string;
  name: string;
  extraPrice: number;
}

export interface ProductOptionGroup {
  id: string;
  name: string;
  type: "SINGLE" | "MULTIPLE";
  required: boolean;
  items: ProductOptionItem[];
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
  optionGroups: ProductOptionGroup[];
}

export interface Category {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
}

// Adicional/opção já escolhida dentro de um item do carrinho
export interface SelectedOption {
  groupId: string;
  groupName: string;
  itemId: string;
  itemName: string;
  extraPrice: number;
}

export interface CartItem {
  id: string; // id único do item no carrinho (não é o id do produto — permite dois "smash triplo" com opções diferentes)
  productId: string;
  name: string;
  imageUrl: string;
  basePrice: number;
  quantity: number;
  selectedOptions: SelectedOption[];
  observation?: string;
}
