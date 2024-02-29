import 'reflect-metadata';
import LibError from '../../../../shared/errors/LibError';
import { ICategoryRepository } from '../../../categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../../categories/repositories/inMemory/CategoryRepositoryInMemory';
import { IUserRepository } from '../../../users/repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../../users/repositories/inMemory/UserRepositoryInMemory';
import { ICreateCardServiceDTO } from '../../dtos/ICreateCardServiceDTO';
import { ICardRepository } from '../../repositories/ICardRepository';
import { CardRepositoryInMemory } from '../../repositories/inMemory/CardRepositoryInMemory';
import { CreateCardService } from '../../services/CreateCardService';

describe('Create card service', () => {
  let cardRepositoryInMemory: ICardRepository;
  let createCardService: CreateCardService;
  let userRepositoryInMemory: IUserRepository;
  let categoryRepositoryInMemory: ICategoryRepository;

  beforeEach(() => {
    cardRepositoryInMemory = new CardRepositoryInMemory();
    userRepositoryInMemory = new UserRepositoryInMemory();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCardService = new CreateCardService(
      cardRepositoryInMemory,
      userRepositoryInMemory,
      categoryRepositoryInMemory,
    );
  });

  it('should be able to create card', async () => {
    const user = {
      name: 'test',
      email: 'test@test',
      password: '1234',
    };

    const userCreated = await userRepositoryInMemory.create(user);

    const card: ICreateCardServiceDTO = {
      status: '10',
      title: 'Test',
      description: 'Test card',
      user_id: userCreated.id,
    };

    const cardCreated = await createCardService.execute(card);

    expect(cardCreated).toHaveProperty('id');
    expect(cardCreated.title).toEqual(card.title);
  });

  it('should not be able to create card without user_id', async () => {
    const card: ICreateCardServiceDTO = {
      status: '10',
      title: 'Test',
      description: 'Test card',
      user_id: 'uuid',
    };

    try {
      await createCardService.execute(card);
    } catch (error) {
      const libError = error as LibError;
      expect(libError instanceof LibError).toBeTruthy();
      expect(libError.statusCode).toBe(404);
      expect(libError.message).toBe('User does not exists!');
    }
  });

  it('should not be able to create card without user_id', async () => {
    try {
      await createCardService.execute({
        title: 'Test',
        description: 'Test card',
        user_id: 'uuid',
      } as ICreateCardServiceDTO);
    } catch (error) {
      const libError = error as LibError;
      expect(libError instanceof LibError).toBeTruthy();
      expect(libError.statusCode).toBe(400);
      expect(libError.message).toBe('Error in the creation of the card!');
    }
  });
});
