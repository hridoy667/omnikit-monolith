import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiUsageGuard } from '../../common/guards/ai-usage.guard';
import { ContentRepurposeDto, TextRefineDto, CoverLetterDto } from './dto/ai-tools.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  // AI Social Post Generator
  @Post('social-post')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AiUsageGuard)
  async generateSocialPosts(@Body() dto: ContentRepurposeDto) {
    return this.aiService.generateSocialPosts(dto);
  }

  // AI Draft Refiner & Grammar Fixer
  @Post('refine-text')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AiUsageGuard)
  async refineText(@Body() dto: TextRefineDto) {
    return this.aiService.refineText(dto);
  }

  //AI Cover Letter Generator
  @Post('generate-cover-letter')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AiUsageGuard)
  async generateCoverLetter(@Body() dto: CoverLetterDto) {
    return this.aiService.generateCoverLetter(dto);
  }
}