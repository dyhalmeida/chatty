import { Request, Response } from 'express';
import { SETTINGS_ERROR_NAME } from '../errors';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
  async create(request: Request, response: Response) {
    const { username, chat } = request.body;
    const settingsService = new SettingsService();
    try {
      const settings = await settingsService.create({ username, chat });
      return response.json({
        message: 'Configuração criada com sucesso',
        data: { ...settings },
      });
    } catch (error: any) {
      console.table(error.data);
      if (error.name === SETTINGS_ERROR_NAME) {
        return response.status(error.data.status).json({
          message: error.message,
          data: {},
        });
      }
      return response.status(500).json({
        message: 'Erro desconhecido no servidor',
        data: {},
      });
    }
  }

  async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;
    const settingsService = new SettingsService();
    try {
      await settingsService.update(username, chat);
      return response.json({
        message: 'Estado do chat atualizado com sucesso',
        data: {},
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

export { SettingsController };
