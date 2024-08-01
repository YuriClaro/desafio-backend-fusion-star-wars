import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({where: { username }});
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(userId: number): Promise<User | undefined> {
  return this.usersRepository.findOneBy({ userId });
  }
}
