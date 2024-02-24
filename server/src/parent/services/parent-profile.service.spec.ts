import { Test, TestingModule } from '@nestjs/testing';
import { ParentProfileService } from './parent-profile.service';

describe('ParentProfileService', () => {
  let service: ParentProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParentProfileService],
    }).compile();

    service = module.get<ParentProfileService>(ParentProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
