
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: {
  name: string;
  description?: string;
}) => {

  const isExists = await prisma.category.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (isExists) {
    throw new Error("Category already exists");
  }

  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
};