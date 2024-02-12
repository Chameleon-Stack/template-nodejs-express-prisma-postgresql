import { prisma } from '../../../../../prisma';
import { ICategory } from '../../../dtos/ICategory';
import { ICreateCategoryDTO } from '../../../dtos/ICreateCategoryDTO';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';

export class CategoryRepository implements ICategoryRepository {
  async create({ name, color, user }: ICreateCategoryDTO): Promise<ICategory> {
    return prisma.category.create({
      data: {
        name,
        color,
        user_id: user.id,
      },
    });
  }

  async findAll(user_id: string, name?: string): Promise<ICategory[]> {
    return prisma.category.findMany({
      where: {
        user_id,
        name: name ? { contains: name.toLowerCase() } : undefined,
      },
    });
  }

  async findById(id: string): Promise<ICategory | null> {
    return prisma.category.findFirst({ where: { id } });
  }

  async delete(category: ICategory): Promise<void> {
    await prisma.category.delete({
      where: { id: category.id },
    });
  }
}
