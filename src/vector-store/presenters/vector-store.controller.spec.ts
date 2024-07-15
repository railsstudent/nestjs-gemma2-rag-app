import { Test, TestingModule } from '@nestjs/testing';
import { VectorStoreController } from './vector-store.controller';

describe('VectorStoreController', () => {
  let controller: VectorStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VectorStoreController],
    }).compile();

    controller = module.get<VectorStoreController>(VectorStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
