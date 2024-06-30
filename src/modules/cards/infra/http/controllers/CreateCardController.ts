import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCardService } from '../../../services/CreateCardService';

export class CreateCardController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createCardService = container.resolve(CreateCardService);

    const { description, title, status } = request.body;

    const { user_id } = request.params;

    const cards = await createCardService.execute({
      user_id,
      description,
      title,
      status,
    });

    return response.status(201).json(cards);
  }
}
