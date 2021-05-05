import { getCustomRepository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessagesRepository } from '../repositories/MessagesRepository';

interface IMessageCreate {
  admin_id: string;
  user_id: string;
  text: string;
}

class MessagesService {
  async create({ text, user_id, admin_id }: IMessageCreate): Promise<Message> {
    const messagesRepository = getCustomRepository(MessagesRepository);
    const message = messagesRepository.create({
      admin_id,
      user_id,
      text,
    });
    await messagesRepository.save(message);
    return message;
  }
}

export { MessagesService };
