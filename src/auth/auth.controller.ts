import { Controller, Post, Body, BadRequestException, UnauthorizedException, InternalServerErrorException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ValidationException } from 'src/exceptions/validation.exception';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      if (error instanceof ValidationException) {
        throw new BadRequestException(error.message);
      } else if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Nome de usuario ou senha inválida');
      } else {
        throw new InternalServerErrorException('Um erro inesperado aconteceu')
      }
    }

  }
}
