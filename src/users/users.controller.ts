import { Controller, Post, Body, Get, Param, UseGuards, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login do usuário' })
  @ApiResponse({ status: 200, description: 'Retorna o token JWT se as credenciais estiverem corretas.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      return { message: 'Credenciais inválidas' };
    }
    return this.authService.login(user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtém todos os usuários' })
  @ApiResponse({ status: 200, description: 'Retorna uma lista de usuários.', type: [User] })
  @ApiResponse({ status: 404, description: 'Nenhum usuário encontrado.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
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
  @ApiOperation({ summary: 'Obtém um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Retorna o usuário correspondente ao ID.', type: User })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 400, description: 'Formato de ID inválido.' })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor.' })
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
