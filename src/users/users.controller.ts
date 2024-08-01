import { Controller, Post, Body, Get, Param, UseGuards, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Credenciais inválidas' };
    }
    return this.authService.login(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
      try {
          const users = await this.usersService.findAll();
          if (users.length === 0) {
              throw new NotFoundException('Nenhum usuario foi encontrado.')
          }
          return users;
      } catch (error) {
          throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto recuperava os usuarios.')
      }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
      try {
          const user = await this.usersService.findUserById(id);
          if (!user) {
              throw new NotFoundException(`Usuário com o ID: ${id} não encontrado.`)
          }
          return user;
      } catch (error) {
          if (error instanceof BadRequestException) {
              throw new BadRequestException('Invalid ID format.');
          } else {
              throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava o usuário')
          }
      }
  }
}
