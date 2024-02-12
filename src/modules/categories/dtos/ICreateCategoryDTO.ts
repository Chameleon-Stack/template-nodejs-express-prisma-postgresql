import { IUser } from '../../users/dtos/IUser';

export interface ICreateCategoryDTO {
  name: string;
  color: string;
  user: IUser;
}
