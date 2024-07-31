import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetsModule } from './planets/planets.module';
import { StarSystemsModule } from './star-systems/star-systems.module';
import { CharactersModule } from './characters/characters.module';
import { SpaceShipsModule } from './space-ships/space-ships.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Planet } from './planets/planet.entity';
import { StarSystem } from './star-systems/star-system.entity';
import { Character } from './characters/character.entity';
import { SpaceShip } from './space-ships/space-ship.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'star-wars-db',
      entities: [Planet, StarSystem, Character, SpaceShip, User],
      synchronize: true,
    }),
    PlanetsModule,
    StarSystemsModule,
    CharactersModule,
    SpaceShipsModule,
    StarSystemsModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
