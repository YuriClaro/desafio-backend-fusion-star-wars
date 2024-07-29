import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShipsController } from './space-ships.controller';

describe('SpaceShipsController', () => {
  let controller: SpaceShipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceShipsController],
    }).compile();

    controller = module.get<SpaceShipsController>(SpaceShipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
