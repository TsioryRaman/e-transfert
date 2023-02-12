import { Test, TestingModule } from '@nestjs/testing';
import { FileTransfertService } from './file-transfert.service';

describe('FileTransfertService', () => {
  let service: FileTransfertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileTransfertService],
    }).compile();

    service = module.get<FileTransfertService>(FileTransfertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
