import { NotFoundError } from "../errors/AppError.js";
import { prisma } from "../lib/prisma.js";
import type { CreateGroupInput } from "../schemas/grupos.schema.js";

export async function createGroup(productId: string, data: CreateGroupInput) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    throw new NotFoundError("Produto não encontrado");
  }

  return prisma.productOptionGroup.create({
    data: {
      name: data.name,
      type: data.type,
      required: data.required,
      productId,
    },
  });
}

export async function updateGroup(
  productId: string,
  groupId: string,
  data: CreateGroupInput,
) {
  const group = await prisma.productOptionGroup.findFirst({
    where: { id: groupId, productId },
  });
  if (!group) {
    throw new NotFoundError("Grupo de opção não encontrado");
  }

  return prisma.productOptionGroup.update({
    where: { id: groupId },
    data: {
      name: data.name,
      type: data.type,
      required: data.required,
    },
  });
}

export async function deleteGroup(productId: string, groupId: string) {
  const group = await prisma.productOptionGroup.findFirst({
    where: { id: groupId, productId },
  });
  if (!group) {
    throw new NotFoundError("Grupo de opção não encontrado");
  }

  return prisma.productOptionGroup.delete({ where: { id: groupId } });
}
