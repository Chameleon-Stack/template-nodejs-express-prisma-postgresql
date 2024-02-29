import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { ICategoryRepository } from '../../categories/repositories/ICategoryRepository';
import { IUserRepository } from '../../users/repositories/IUserRepository';
import { ICard } from '../dtos/ICard';
import { ICreateCardServiceDTO } from '../dtos/ICreateCardServiceDTO';
import { ICardRepository } from '../repositories/ICardRepository';

@injectable()
export class CreateCardService {
  constructor(
    @inject('CardRepository')
    private cardRepository: ICardRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({
    user_id,
    description,
    title,
    status,
    category_ids,
  }: ICreateCardServiceDTO): Promise<ICard> {
    if (!user_id || !description || !title || !status) {
      throw new LibError('Error in the creation of the card!');
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new LibError('User does not exists!', 404);
    }

    const card = await this.cardRepository.create({
      status,
      title,
      description,
      user,
      categories_ids: category_ids,
    });

    return card;
  }
}
