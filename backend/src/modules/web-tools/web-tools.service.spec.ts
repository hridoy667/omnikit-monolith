import { Test, TestingModule } from '@nestjs/testing';
import { WebToolsService } from './web-tools.service';

describe('WebToolsService', () => {
  let service: WebToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebToolsService],
    }).compile();

    service = module.get<WebToolsService>(WebToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
