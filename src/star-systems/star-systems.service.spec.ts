import { Test, TestingModule } from '@nestjs/testing';
import { StarSystemsService } from './star-systems.service';

describe('StarSystemsService', () => {
  let service: StarSystemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarSystemsService],
    }).compile();

    service = module.get<StarSystemsService>(StarSystemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
