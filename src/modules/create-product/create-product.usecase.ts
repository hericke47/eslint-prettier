import { prismaClient } from "../../database/prismaClient";

interface CreateProductRequest {
  name: string;
  code: string;
  quantity: number;
  price: number;
}

export class CreateProductUsecase {
  async execute(data: CreateProductRequest): Promise<CreateProductRequest> {
    const product = await prismaClient.product.findFirst({
      where: {
        code: data.code,
      },
    });

    if (product) throw new Error("Product already exists!");

    const productCreated = await prismaClient.product.create({
      data: {
        ...data,
      },
    });

    return productCreated;
  }
}
