import { getCustomRepository } from 'typeorm';
import { Setting } from '../entities/Setting';
import { SettingsAlreadyExists } from '../errors/SettingsAlreadyExists';
import { SettingsRepository } from '../repositories/SettingsRepository';

interface ISettingsService {
  username: string;
  chat: boolean;
}

class SettingsService {
  async create({ username, chat }: ISettingsService): Promise<Setting> {
    const settingsRepository = getCustomRepository(SettingsRepository);
    const settingsAlreadyExists = await settingsRepository.findOne({
      username,
    });
    if (settingsAlreadyExists) {
      throw new SettingsAlreadyExists('Configuração de usuário já existe');
    }
    const settings = settingsRepository.create({
      username,
      chat,
    });
    await settingsRepository.save(settings);
    return settings;
  }
}

export { SettingsService };
