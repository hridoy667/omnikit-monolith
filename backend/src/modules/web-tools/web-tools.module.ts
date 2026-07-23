import { Module } from '@nestjs/common';
import { WebToolsService } from './web-tools.service';
import { WebToolsController } from './web-tools.controller';

@Module({
  controllers: [WebToolsController],
  providers: [WebToolsService],
})
export class WebToolsModule {}
