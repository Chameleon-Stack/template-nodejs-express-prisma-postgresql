import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateCardService } from '../../../services/UpdateCardService';

export class UpdateCardController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateCardService = container.resolve(UpdateCardService);

    const { description, title, status, category_ids } = request.body;

    const { id } = request.params;

    const play = await updateCardService.execute({
      id,
      description,
      title,
      status,
      category_ids,
    });

    return response.status(201).json(play);
  }
}
