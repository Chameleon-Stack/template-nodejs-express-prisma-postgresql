import fs from 'fs';
import 'reflect-metadata';
import LibError from '../../../../shared/errors/LibError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '../../dtos/IUpdateUserDTO';
import { IUserRepository } from '../../repositories/IUserRepository';
import { UserRepositoryInMemory } from '../../repositories/inMemory/UserRepositoryInMemory';
import { CreateUserService } from '../../services/CreateUserService';
import { UpdateUserService } from '../../services/UpdateUserService';

jest.mock('fs');

describe('Update user service', () => {
  let userRepositoryInMemory: IUserRepository;
  let createUserService: CreateUserService;
  let updateUserService: UpdateUserService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
    updateUserService = new UpdateUserService(userRepositoryInMemory);
  });

  it('should be able to update user', async () => {
    fs.rmdirSync = jest.fn(() => 'mocked value');

    const user: ICreateUserDTO = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    const userCreated = (await createUserService.execute(user)) as any;

    await updateUserService.execute({
      ...userCreated,
      password: user.password,
      new_password: '54321',
      photo: 'photo.png',
    });

    expect(fs.rmdirSync).toHaveBeenCalled();
    expect(userCreated).toHaveProperty('id');
    expect(userCreated.name).toEqual(user.name);
    expect(userCreated.email).toEqual(user.email);
  });

  it('should not be able to update user without user', async () => {
    const user = {
      id: 'UUID',
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    await expect(updateUserService.execute(user)).rejects.toEqual(
      new LibError('User does not exists', 404),
    );
  });

  it('should not be able to update user without user', async () => {
    const user: ICreateUserDTO = {
      email: 'example@example.com',
      password: '1234',
      name: 'User test',
    };

    const userCreated = (await createUserService.execute(
      user,
    )) as IUpdateUserDTO;
    userCreated.password = '4321';

    await expect(updateUserService.execute(userCreated)).rejects.toEqual(
      new LibError('Password incorrect', 400),
    );
  });
});
