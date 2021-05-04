import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';

class SettingsController {
  async create(request: Request, response: Response) {
    try {
      const { username, chat } = request.body;
      const settingsRepository = getCustomRepository(SettingsRepository);
      const settings = settingsRepository.create({
        username,
        chat,
      });
      await settingsRepository.save(settings);
      return response.json({
        message: 'Configuração criada com sucesso',
        data: { ...settings },
      });
    } catch (error) {
      console.error(error.message);
      return response.status(500).json({
        message: 'Erro desconhecido no servidor',
        data: {},
      });
    }
  }
}

export { SettingsController };
