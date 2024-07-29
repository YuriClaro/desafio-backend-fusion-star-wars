import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from './planet.entity';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Planet])],
  providers: [PlanetsService],
  controllers: [PlanetsController],
})
export class PlanetsModule {}
