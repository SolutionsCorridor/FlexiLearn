import { Test, TestingModule } from '@nestjs/testing';
import { ParentProfileController } from './parent-profile.controller';

describe('ParentProfileController', () => {
  let controller: ParentProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParentProfileController],
    }).compile();

    controller = module.get<ParentProfileController>(ParentProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
