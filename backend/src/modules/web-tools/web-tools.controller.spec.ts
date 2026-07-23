import { Test, TestingModule } from '@nestjs/testing';
import { WebToolsController } from './web-tools.controller';
import { WebToolsService } from './web-tools.service';

describe('WebToolsController', () => {
  let controller: WebToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebToolsController],
      providers: [WebToolsService],
    }).compile();

    controller = module.get<WebToolsController>(WebToolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
