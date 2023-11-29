import { IUser } from '../../../users/dtos/IUser';
import { UserRepository } from '../../../users/infra/prisma/repositories/UserRepository';
import { IUserRepository } from '../../../users/repositories/IUserRepository';
import { ICategory } from '../../dtos/ICategory';
import { CategoryRepository } from '../../infra/prisma/repositories/CategoryRepository';
import { ICategoryRepository } from '../../repositories/ICategoryRepository';

describe('Category repository test', () => {
  let categoryRepository: ICategoryRepository;
  let userRepository: IUserRepository;

  let user: IUser;

  beforeAll(async () => {
    categoryRepository = new CategoryRepository();
    userRepository = new UserRepository();

    const name = 'test';
    const email = 'test@test';
    const password = '1234';

    user = (await userRepository.create({ name, email, password })) as IUser;
  });

  it('Should be able to create a category', async () => {
    const name = 'test';

    const category = await categoryRepository.create(name, user);

    expect(category).toHaveProperty('id');
    expect(category.name).toEqual(name);
  });

  it('Should be able to delete category', async () => {
    const name = 'test 1';

    const category = await categoryRepository.create(name, user);

    await categoryRepository.delete(category);

    const foundCategory = await categoryRepository.findById(category.id);

    expect(foundCategory).toBeNull();
  });

  it('Should be able to find by ID', async () => {
    const name = 'test 2';

    const category = await categoryRepository.create(name, user);

    const foundCategory = (await categoryRepository.findById(
      category.id,
    )) as ICategory;

    expect(foundCategory.id).toEqual(category.id);
  });

  it('Should be able to find all with filter name', async () => {
    const name = 'test 3';

    const category = await categoryRepository.create(name, user);

    const foundCategories = await categoryRepository.findAll(
      user.id,
      category.name,
    );

    expect(foundCategories).toHaveLength(1);
    expect(foundCategories[0].id).toEqual(category.id);
  });

  it('Should be able to find all', async () => {
    const name = 'test 4';

    const category = await categoryRepository.create(name, user);

    const foundCategories = await categoryRepository.findAll(user.id);

    expect(foundCategories).toHaveLength(1);
    expect(foundCategories[0].id).toEqual(category.id);
  });
});