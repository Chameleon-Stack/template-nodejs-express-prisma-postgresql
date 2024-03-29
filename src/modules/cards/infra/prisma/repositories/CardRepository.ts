import { prisma } from '../../../../../prisma';
import { ICard } from '../../../dtos/ICard';
import { ICreateCardDTO } from '../../../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../../../dtos/IGetAllCardsDTO';
import { ICardRepository } from '../../../repositories/ICardRepository';

export class CardRepository implements ICardRepository {
  async create({
    description,
    status,
    title,
    user,
    categories_ids,
  }: ICreateCardDTO): Promise<ICard> {
    const card = await prisma.cards.create({
      data: {
        description,
        status,
        title,
        user_id: user.id,
      },
    });

    if (categories_ids) {
      for (const category_id of categories_ids) {
        await prisma.cardCategory.create({
          data: {
            card_id: card.id,
            category_id,
          },
        });
      }
    }

    return card;
  }

  async update(card: ICard): Promise<ICard> {
    return prisma.cards.update({
      where: { id: card.id },
      data: card,
    });
  }

  async findById(id: string): Promise<ICard | null> {
    return prisma.cards.findFirst({ where: { id } });
  }

  async findAll({
    id,
    description,
    status,
    title,
    user_id,
  }: IGetAllCardsDTO): Promise<ICard[]> {
    return prisma.cards.findMany({
      where: {
        user_id,
        id: id ? { equals: id } : undefined,
        description: description
          ? { contains: description.toLowerCase() }
          : undefined,
        status: status ? { equals: status } : undefined,
        title: title ? { contains: title.toLowerCase() } : undefined,
      },
    });
  }

  async delete(card: ICard): Promise<void> {
    await prisma.cards.delete({
      where: { id: card.id },
    });
  }
}
