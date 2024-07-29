import { Test, TestingModule } from '@nestjs/testing';
import { StarSystemsController } from './star-systems.controller';

describe('StarSystemsController', () => {
  let controller: StarSystemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarSystemsController],
    }).compile();

    controller = module.get<StarSystemsController>(StarSystemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
