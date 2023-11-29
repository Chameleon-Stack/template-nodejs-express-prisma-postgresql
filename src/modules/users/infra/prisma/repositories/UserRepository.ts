import { prisma } from '../../../../../prisma';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';
import { IUser } from '../../../dtos/IUser';
import { IUserRepository } from '../../../repositories/IUserRepository';

export class UserRepository implements IUserRepository {
  async create(new_user: ICreateUserDTO): Promise<IUser> {
    return prisma.user.create({
      data: new_user,
    });
  }

  async update(user: IUser): Promise<IUser> {
    return prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return prisma.user.findFirst({ where: { email } });
  }

  async findById(id: string): Promise<IUser | null> {
    return prisma.user.findFirst({ where: { id } });
  }

  async delete(user: IUser): Promise<void> {
    await prisma.user.delete({
      where: { id: user.id },
    });
  }
}
