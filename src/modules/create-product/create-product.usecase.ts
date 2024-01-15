import { prismaClient } from "../../database/prismaClient"

type CreateProductRequest = {
  name: string,
  code: string,
  quantity: number,
  price: number
}

export class CreateProductUsecase {
  constructor() {}

  async execute(data: CreateProductRequest) {
    const product = await prismaClient.product.findFirst({
      where: {
        code: data.code
      }
    })

    if(product) throw new Error("Product already exists!")

    const productCreated = await prismaClient.product.create({
      data: {
        ...data
      }
    })

    return productCreated
  }
}