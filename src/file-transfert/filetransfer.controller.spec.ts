import { Test, TestingModule } from '@nestjs/testing';
import { FiletransferController } from './filetransfer.controller';

describe('FiletransferController', () => {
  let controller: FiletransferController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiletransferController],
    }).compile();

    controller = module.get<FiletransferController>(FiletransferController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
