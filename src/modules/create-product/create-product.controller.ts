import { type Request, type Response } from "express";
import { CreateProductUsecase } from "./create-product.usecase";

export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const useCase = new CreateProductUsecase();

    try {
      const result = await useCase.execute(request.body);

      return response.json(result);
    } catch (err) {
      console.log(err);
      return response.status(400).json(err);
    }
  }
}
