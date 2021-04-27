import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository";

interface IUserCreate {
  email: string;
}

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({ email }: IUserCreate) {
    const userAlreadyExists = await this.usersRepository.findOne({ email });
    if (userAlreadyExists) return userAlreadyExists;

    const user = this.usersRepository.create({ email });

    await this.usersRepository.save(user);
    return user;
  }
}

export { UsersService };
