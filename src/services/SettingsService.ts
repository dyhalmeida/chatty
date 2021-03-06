import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Setting';
import { SettingsAlreadyExists } from '../errors/SettingsAlreadyExists';
import { SettingsRepository } from '../repositories/SettingsRepository';

interface ISettingsService {
  username: string;
  chat: boolean;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ username, chat }: ISettingsService): Promise<Setting> {
    const settingsAlreadyExists = await this.settingsRepository.findOne({
      username,
    });
    if (settingsAlreadyExists) {
      throw new SettingsAlreadyExists('Configuração de usuário já existe');
    }
    const settings = this.settingsRepository.create({
      username,
      chat,
    });
    await this.settingsRepository.save(settings);
    return settings;
  }

  async update(username: string, chat: boolean) {
    await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username = :username', { username })
      .execute();
  }

  async show(username: string) {
    const settings = await this.settingsRepository.findOne({ username });
    return settings;
  }
}

export { SettingsService };
