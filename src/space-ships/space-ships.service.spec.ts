import { Test, TestingModule } from '@nestjs/testing';
import { SpaceShipsService } from './space-ships.service';

describe('SpaceShipsService', () => {
  let service: SpaceShipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpaceShipsService],
    }).compile();

    service = module.get<SpaceShipsService>(SpaceShipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
