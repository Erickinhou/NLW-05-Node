import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ISettingsCreate) {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username
    });

    if (userAlreadyExists) {
      throw new Error("User already exists!"); //throw will stop the function here, and nafem will be execute after
    }

    const settings = this.settingsRepository.create({
      //here I have more data in settings object
      chat,
      username
    });
    await this.settingsRepository.save(settings);
    return settings;
  }
}

export { SettingsService };
