import { Test, TestingModule } from '@nestjs/testing';
import { FiletransfertController } from './filetransfert.controller';

describe('FiletransfertController', () => {
  let controller: FiletransfertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiletransfertController],
    }).compile();

    controller = module.get<FiletransfertController>(FiletransfertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
