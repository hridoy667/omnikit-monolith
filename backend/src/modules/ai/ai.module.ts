import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { AiEngineService } from './providers/ai-engine.service';

@Module({
  controllers: [AiController],
  providers: [AiService, AiEngineService],
  exports: [AiService],
})
export class AiModule {}