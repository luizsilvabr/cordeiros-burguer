import { NotFoundError } from "../errors/AppError.js";
import { prisma } from "../lib/prisma.js";
import type { CreateItemInput } from "../schemas/itens.schema.js";

export async function createItem(groupId: string, data: CreateItemInput) {
  const group = await prisma.productOptionGroup.findUnique({
    where: { id: groupId },
  });
  if (!group) {
    throw new NotFoundError("Grupo de opção não encontrado");
  }

  return prisma.productOptionItem.create({
    data: {
      name: data.name,
      extraPrice: data.extraPrice,
      groupId,
    },
  });
}

export async function updateItem(
  groupId: string,
  itemId: string,
  data: CreateItemInput,
) {
  const item = await prisma.productOptionItem.findFirst({
    where: { id: itemId, groupId },
  });
  if (!item) {
    throw new NotFoundError("Item de opção não encontrado");
  }

  return prisma.productOptionItem.update({
    where: { id: itemId },
    data: {
      name: data.name,
      extraPrice: data.extraPrice,
    },
  });
}

export async function deleteItem(groupId: string, itemId: string) {
  const item = await prisma.productOptionItem.findFirst({
    where: { id: itemId, groupId },
  });
  if (!item) {
    throw new NotFoundError("Item de opção não encontrado");
  }

  return prisma.productOptionItem.delete({ where: { id: itemId } });
}
