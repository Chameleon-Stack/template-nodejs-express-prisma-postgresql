export interface ICreateCardDTO {
  status: string;
  title: string;
  description: string;
  user: any;
  categories_ids?: string[];
}
