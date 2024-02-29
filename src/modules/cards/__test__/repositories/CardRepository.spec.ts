/* eslint-disable no-return-await */
import { IUser } from '../../../users/dtos/IUser';
import { UserRepository } from '../../../users/infra/prisma/repositories/UserRepository';
import { IUserRepository } from '../../../users/repositories/IUserRepository';
import { ICard } from '../../dtos/ICard';
import { ICreateCardDTO } from '../../dtos/ICreateCardDTO';
import { IGetAllCardsDTO } from '../../dtos/IGetAllCardsDTO';
import { CardRepository } from '../../infra/prisma/repositories/CardRepository';
import { ICardRepository } from '../../repositories/ICardRepository';

describe('Card repository test', () => {
  let cardRepository: ICardRepository;
  let userRepository: IUserRepository;

  let user: IUser;

  beforeAll(async () => {
    cardRepository = new CardRepository();
    userRepository = new UserRepository();

    const name = 'test';
    const email = 'test@test';
    const password = '1234';

    user = await userRepository.create({ name, email, password });
  });

  it('Should be able to create a card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 1',
      description: 'Test card 1',
      user,
    };

    const createdCard = await cardRepository.create(card);

    expect(createdCard).toHaveProperty('id');
    expect(createdCard.status).toEqual(card.status);
  });

  it('Should be able to delete card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 2',
      description: 'Test card 2',
      user,
    };

    const createdCard = await cardRepository.create(card);

    await cardRepository.delete(createdCard);

    const foundCard = await cardRepository.findById(createdCard.id);

    expect(foundCard).toBeNull();
  });

  it('Should be able to update card', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 3',
      description: 'Test card 3',
      user,
    };

    const createdCard = await cardRepository.create(card);

    createdCard.status = '20';

    const updateCard = await cardRepository.update(createdCard);

    expect(updateCard.status).toEqual('20');
  });

  it('Should be able to find by ID', async () => {
    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 4',
      description: 'Test card 4',
      user,
    };

    const createdCard = await cardRepository.create(card);

    const foundCard = (await cardRepository.findById(createdCard.id)) as ICard;

    expect(foundCard.id).toEqual(createdCard.id);
  });

  it('Should be able to find all by filters', async () => {
    const foundCardSDeleted = await cardRepository.findAll({
      user_id: user.id,
    } as IGetAllCardsDTO);

    foundCardSDeleted.forEach(async card => await cardRepository.delete(card));

    const card: ICreateCardDTO = {
      status: '10',
      title: 'Test 5',
      description: 'Test card 5',
      user,
    };

    const createdCard = await cardRepository.create(card);

    const foundCard = await cardRepository.findAll({
      user_id: createdCard.user_id,
      status: card.status,
      title: card.title,
      description: card.description,
      id: createdCard.id,
    } as IGetAllCardsDTO);
    console.log({
      user_id: createdCard.user_id,
      status: card.status,
      title: card.title,
      description: card.description,
      id: createdCard.id,
    });

    expect(foundCard).toHaveLength(1);
    expect(foundCard[0].id).toEqual(createdCard.id);
  });
});
