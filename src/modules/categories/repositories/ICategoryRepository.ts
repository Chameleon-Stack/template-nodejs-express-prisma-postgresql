import { ICategory } from '../dtos/ICategory';
import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';

export interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<ICategory>;
  findAll(user_id: string, name?: string): Promise<ICategory[]>;
  findById(id: string): Promise<ICategory | null>;
  delete(category: ICategory): Promise<void>;
}
