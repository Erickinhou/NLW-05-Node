import { Repository, EntityRepository } from "typeorm";
import { Setting } from "../entities/Setting";
//The repository is a way to manage the operations that
//you can do on the entity (and build you own operations)

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {}

export { SettingsRepository };
