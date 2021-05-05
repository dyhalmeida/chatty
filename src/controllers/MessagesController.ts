import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

class MessagesController {
  async create(request: Request, response: Response) {
    const { user_id, admin_id, text } = request.body;
    const messageService = new MessagesService();
    try {
      const message = await messageService.create({ text, user_id, admin_id });
      return response.status(201).json({
        message: 'Mensagem criada com sucesso',
        data: { ...message },
      });
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({
        message: 'Erro interno no servidor',
        data: {},
      });
    }
  }
  async index(request: Request, response: Response) {
    const { user_id } = request.params;
    const messagesService = new MessagesService();
    try {
      const messages = await messagesService.index(user_id);
      return response.status(200).json({
        message: 'Mensagens listadas com sucesso',
        data: messages,
      });
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({
        message: 'Erro interno no servidor',
        data: {},
      });
    }
  }
}

export { MessagesController };
