import 'reflect-metadata';
import LibError from '../../../../shared/errors/LibError';
import { IUserRepository } from '../../../users/repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../../users/repositories/inMemory/UserRepositoryInMemory';
import { ICreateCategoryUseCaseDTO } from '../../dtos/ICreateCategoryUseCaseDTO';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '../../repositories/inMemory/CategoryRepositoryInMemory';
import { CreateCategoryService } from '../../services/CreateCategoryService';

describe('Create category service', () => {
  let categoryRepositoryInMemory: ICategoryRepository;
  let userRepositoryInMemory: IUserRepository;
  let createCategoryService: CreateCategoryService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoryRepositoryInMemory,
      userRepositoryInMemory,
    );
  });

  it('should be able to create category', async () => {
    const name = 'Category test';
    const color = 'red';

    const user = {
      name: 'test',
      email: 'test@test',
      password: '1234',
    };

    const userCreated = await userRepositoryInMemory.create(user);

    const categoryCreated = await createCategoryService.execute({
      name,
      color,
      user_id: userCreated.id,
    });

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create category with user does not exists', async () => {
    await expect(
      createCategoryService.execute({
        name: 'test',
        color: 'red',
        user_id: 'uuid',
      }),
    ).rejects.toEqual(new LibError('User does not exists!', 404));
  });

  it('should not be able to create category with user does not exists', async () => {
    await expect(
      createCategoryService.execute({
        color: 'red',
        user_id: 'uuid',
      } as ICreateCategoryUseCaseDTO),
    ).rejects.toEqual(new LibError('Name/User id is required!', 400));
  });

  it('should not be able to create category with user does not exists', async () => {
    await expect(
      createCategoryService.execute({
        color: 'red',
        user_id: 'uuid',
      } as ICreateCategoryUseCaseDTO),
    ).rejects.toEqual(new LibError('Name/User id is required!', 400));
  });
});
