import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarSystem } from './star-system.entity';
import { StarSystemsService } from './star-systems.service';
import { StarSystemsController } from './star-systems.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StarSystem])],
  providers: [StarSystemsService],
  controllers: [StarSystemsController],
})
export class StarSystemsModule {}
