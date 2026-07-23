import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiEngineService {
  private readonly logger = new Logger(AiEngineService.name);
  private groqClient: OpenAI;
  private openRouterClient: OpenAI;

  constructor(private readonly configService: ConfigService) {
    // 1. Initialize Groq Client 
    this.groqClient = new OpenAI({
      apiKey: this.configService.get<string>('ai.groq'),
      baseURL: 'https://api.groq.com/openai/v1',
    });

    // 2. Initialize OpenRouter Client
    this.openRouterClient = new OpenAI({
      apiKey: this.configService.get<string>('ai.openRouter'),
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': this.configService.get<string>('app.url', 'https://yourdomain.com'),
        'X-Title': this.configService.get<string>('app.name', 'My App'),
      },
    });
  }

  /**
   * Main completion method with automatic fallback
   */
  async generateCompletion(prompt: string, systemPrompt?: string): Promise<string> {
    // Ensure 'json' is present in the system prompt for Groq JSON mode requirement
    const jsonSystemPrompt = systemPrompt 
      ? systemPrompt 
      : 'You are a helpful AI assistant. Always respond in valid JSON format.';

    try {
      this.logger.log('Executing AI request via Groq...');
      return await this.callGroq(prompt, jsonSystemPrompt);
    } catch (error: any) {
      this.logger.warn(`Groq failed: ${error.message}. Falling back to OpenRouter...`);
      
      try {
        return await this.callOpenRouter(prompt, jsonSystemPrompt);
      } catch (fallbackError: any) {
        this.logger.error(`OpenRouter also failed: ${fallbackError.message}`);
        throw new InternalServerErrorException('AI Service is temporarily unavailable. Please try again in a few moments.');
      }
    }
  }

  // --- Provider 1: Groq ---
  private async callGroq(prompt: string, systemPrompt: string): Promise<string> {
    const model = this.configService.get<string>('GROQ_MODEL', 'llama-3.3-70b-versatile');

    const response = await this.groqClient.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    });

    return response.choices[0]?.message?.content || '{}';
  }

  // --- Provider 2: OpenRouter Fallback ---
  private async callOpenRouter(prompt: string, systemPrompt: string): Promise<string> {
    const model = this.configService.get<string>(
      'OPENROUTER_MODEL',
      'meta-llama/llama-3.3-70b-instruct:free',
    );

    const response = await this.openRouterClient.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
      response_format: { type: 'json_object' },
    });

    return response.choices[0]?.message?.content || '{}';
  }
}