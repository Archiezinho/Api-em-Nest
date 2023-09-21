import { Test, TestingModule } from '@nestjs/testing';
import { UsersCountService } from './users-count.service';

describe('UsersCountService', () => {
  let service: UsersCountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCountService],
    }).compile();

    service = module.get<UsersCountService>(UsersCountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
