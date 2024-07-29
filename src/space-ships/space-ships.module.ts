import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceShip } from './space-ship.entity';
import { SpaceShipsService } from './space-ships.service';
import { SpaceShipsController } from './space-ships.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceShip])],
  providers: [SpaceShipsService],
  controllers: [SpaceShipsController]
})
export class SpaceShipsModule {}
