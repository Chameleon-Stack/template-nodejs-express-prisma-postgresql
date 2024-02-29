export interface ICreateCardServiceDTO {
  status: string;
  title: string;
  description: string;
  user_id: string;
  category_ids?: string[];
}
