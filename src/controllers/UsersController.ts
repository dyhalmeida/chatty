import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';

class UsersController {
  async create(request: Request, response: Response) {
    const usersService = new UsersService();
    const { email } = request.body;
    try {
      const user = await usersService.create(email);
      return response.status(201).json({
        message: 'Usuário criado com sucesso',
        data: { ...user },
      });
    } catch (error) {
      console.table(error);
      return response.status(500).json({
        message: 'Erro interno no servidor',
        data: {},
      });
    }
  }
}

export { UsersController };
