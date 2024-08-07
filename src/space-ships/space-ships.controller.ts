import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, NotFoundException, BadRequestException, InternalServerErrorException, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { SpaceShipsService } from './space-ships.service';
import { SpaceShip } from './space-ship.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationException } from 'src/exceptions/validation.exception';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { LoggerService } from '../logger/logger.service';

@ApiTags('SpaceShips')
@Controller('spaceships')
export class SpaceShipsController {
    constructor(private readonly spaceshipService: SpaceShipsService, private readonly loggerService: LoggerService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    @ApiOperation({ summary: 'Criar uma nova nave espacial' })
    @ApiResponse({ status: 201, description: 'Nave criada com sucesso.', type: SpaceShip })
    @ApiResponse({ status: 400, description: 'Solicitação inválida, verifique às informações.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto a nave estava sendo criada.' })
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
    async create(@Body() createSpaceShipaDto: SpaceShip): Promise<SpaceShip> {
        try {
            this.loggerService.log('Criando uma nova nave.')
            return await this.spaceshipService.create(createSpaceShipaDto);
        } catch (error) {
            this.loggerService.error('Erro ao criar a nave', error.stack)
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação Invalida, verifique às informações');
            } else {
                throw new InternalServerErrorException('Um erro insperado aconteceu enquanto a nave estava sendo criado')
            }
        }
    }

    @Get()
    @ApiOperation({ summary: 'Obter todas as naves espaciais' })
    @ApiResponse({ status: 200, description: 'Lista de naves retornada com sucesso.', type: [SpaceShip] })
    @ApiResponse({ status: 404, description: 'Nenhuma nave foi encontrada.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto recuperava as naves espaciais.' })
    async findAll(): Promise<SpaceShip[]> {
        try {
            this.loggerService.log('Buscando todos as naves')
            const spaceship = await this.spaceshipService.findAll();
            if (spaceship.length === 0) {
                throw new NotFoundException('Nenhuma nave foi encontrada.')
            }
            return spaceship;
        } catch (error) {
            this.loggerService.error('Erro ao buscar as naves', error.stack)
            throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto recuperava as naves espaciais.')
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obter uma nave espacial pelo ID' })
    @ApiParam({ name: 'id', description: 'ID da nave espacial', type: Number })
    @ApiResponse({ status: 200, description: 'Nave retornada com sucesso.', type: SpaceShip })
    @ApiResponse({ status: 404, description: 'Nave com o ID fornecido não encontrada.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto retornava a nave.' })
    async findOne(@Param('id') id: number): Promise<SpaceShip> {
        try {
            this.loggerService.log(`Buscando nave com ID: ${id}`)
            const spaceship = await this.spaceshipService.findSpaceShipById(id);
            if (!spaceship) {
                throw new NotFoundException(`Nave com o ID: ${id} não encontrado.`)
            }
            return spaceship;
        } catch (error) {
            this.loggerService.error(`Erro ao buscar nave`, error.stack)
            if (error instanceof BadRequestException) {
                throw new BadRequestException('Invalid ID format.');
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava a nave')
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true}))
    @ApiOperation({ summary: 'Atualizar uma nave espacial pelo ID' })
    @ApiParam({ name: 'id', description: 'ID da nave espacial', type: Number })
    @ApiResponse({ status: 200, description: 'Nave atualizada com sucesso.', type: SpaceShip })
    @ApiResponse({ status: 404, description: 'Nave com o ID fornecido não encontrada.' })
    @ApiResponse({ status: 400, description: 'Solicitação inválida.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto retornava a nave.' })
    async update(@Param('id') id: number, @Body() updatedSpaceShipDto: SpaceShip): Promise<SpaceShip> {
        try {
            this.loggerService.log(`Atualizando nave com ID ${id}`);
            const updatedSpaceShip = await this.spaceshipService.update(id, updatedSpaceShipDto);
            if (!updatedSpaceShip) {
                throw new NotFoundException(`Nave com o ID: ${id} não encontrado.`)
            }
            return updatedSpaceShip;
        } catch (error) {
            this.loggerService.error('Erro enquanto atualiza a nave.', error.stack);
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação inválida.')
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException('Formato invalido para ID.')
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava a nave.')
            }
        }  
        
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Remover uma nave espacial pelo ID' })
    @ApiParam({ name: 'id', description: 'ID da nave espacial', type: Number })
    @ApiResponse({ status: 204, description: 'Nave removida com sucesso.' })
    @ApiResponse({ status: 404, description: 'Nave com o ID fornecido não encontrada.' })
    @ApiResponse({ status: 400, description: 'Solicitação inválida.' })
    @ApiResponse({ status: 500, description: 'Um erro inesperado aconteceu enquanto removia a nave.' })
    async remove(@Param('id') id: number): Promise<void> {
        try {
            this.loggerService.log(`Removendo nave com ID: ${id}`);
            const result = await this.spaceshipService.remove(id);
            if (!result) {
                throw new NotFoundException(`Nave com o ID: ${id} não encontrado.`);
            }
        } catch (error) {
            this.loggerService.error('Erro enquanto removia a nave.', error.stack);
            if (error instanceof ValidationException) {
                throw new BadRequestException('Solicitação inválida.')
            } else if (error instanceof BadRequestException) {
                throw new BadRequestException('Formato invalido para ID.')
            } else {
                throw new InternalServerErrorException('Um erro inesperado aconteceu enquanto retornava a nave.')
            }
        }
    } 
}
