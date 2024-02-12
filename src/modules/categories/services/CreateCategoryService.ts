import { inject, injectable } from 'tsyringe';
import LibError from '../../../shared/errors/LibError';
import { IUserRepository } from '../../users/repositories/IUserRepository';
import { ICategory } from '../dtos/ICategory';
import { ICreateCategoryUseCaseDTO } from '../dtos/ICreateCategoryUseCaseDTO';
import { ICategoryRepository } from '../repositories/ICategoryRepository';

@injectable()
export class CreateCategoryService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    color,
    user_id,
  }: ICreateCategoryUseCaseDTO): Promise<ICategory> {
    if (!name || !user_id) {
      throw new LibError('Name/User id is required!');
    }

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new LibError('User does not exists!', 404);
    }

    const card = await this.categoryRepository.create({ name, color, user });

    return card;
  }
}
