import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AiEngineService } from './providers/ai-engine.service';
import { ContentRepurposeDto, TextRefineDto, CoverLetterDto, RelatedImage } from './dto/ai-tools.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  // Unsplash free tier: 50 req/hour on the Demo plan. Set in .env.
  private readonly unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

  constructor(private readonly aiEngineService: AiEngineService) { }

  /**
   * Fetches a single relevant stock photo from Unsplash for a given query.
   * Fails soft (returns null) so a broken/missing image never breaks the
   * core text-generation feature — image is a nice-to-have, not critical path.
   */
  private async fetchRelatedImage(query: string): Promise<RelatedImage | null> {
    if (!this.unsplashAccessKey || !query) return null;

    try {
      const params = new URLSearchParams({
        query,
        per_page: '1',
        orientation: 'landscape',
        content_filter: 'high',
      });
      const res = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
        headers: { Authorization: `Client-ID ${this.unsplashAccessKey}` },
      });

      if (!res.ok) {
        this.logger.warn(`Unsplash request failed: ${res.status}`);
        return null;
      }

      const data = await res.json();
      const photo = data?.results?.[0];
      if (!photo) return null;

      return {
        url: photo.urls?.regular,
        altDescription: photo.alt_description || query,
        credit: {
          photographerName: photo.user?.name,
          photographerUrl: `${photo.user?.links?.html}?utm_source=your_app&utm_medium=referral`,
          unsplashUrl: 'https://unsplash.com/?utm_source=your_app&utm_medium=referral',
        },
      };
    } catch (err) {
      this.logger.warn(`Unsplash fetch error: ${err instanceof Error ? err.message : err}`);
      return null;
    }
  }

  /**
   * Executes an AI call and safely parses JSON.
   * Strips stray ```json fences — free/small models frequently add these
   * even when told not to, and it's cheaper to strip than to retry.
   */
  private async executeAndParseJson<T>(prompt: string, systemPrompt: string): Promise<T> {
    const rawResult = await this.aiEngineService.generateCompletion(prompt, systemPrompt);
    const cleaned = rawResult.replace(/```json|```/g, '').trim();
    try {
      return JSON.parse(cleaned) as T;
    } catch {
      this.logger.error(`JSON parse failed. Raw output (truncated): ${cleaned.slice(0, 200)}`);
      throw new InternalServerErrorException('Failed to process AI response output.');
    }
  }

  // ---------------------------------------------------------------------
  // Tool #1: Social Post Generation
  // ---------------------------------------------------------------------
  async generateSocialPosts(dto: ContentRepurposeDto) {
    const systemPrompt = `Repurpose the input content into 3 platform-specific posts.
Output ONLY raw JSON. No markdown, no preamble, no explanation.
Schema:
{"twitter":"<=280 chars, punchy hook, no hashtag spam","linkedIn":"professional tone, 1-2 relevant hashtags at end","newsletter":"1 short headline + 2-3 sentence body","imageQuery":"2-3 word visual keyword phrase for a stock photo matching the topic"}`;

    const result = await this.executeAndParseJson<{
      twitter: string;
      linkedIn: string;
      newsletter: string;
      imageQuery: string;
    }>(dto.content, systemPrompt);

    const relatedImage = await this.fetchRelatedImage(result.imageQuery);

    return { ...result, relatedImage };
  }

  // ---------------------------------------------------------------------
  // Tool #10: Text Refinement
  // ---------------------------------------------------------------------
  async refineText(dto: TextRefineDto) {
    const tone = dto.tone || 'professional';
    const systemPrompt = `Edit the input text: fix grammar, improve clarity, set tone to "${tone}".
Output ONLY raw JSON. No markdown, no preamble.
Schema:
{"refinedText":"string","corrections":["max 3 short fix notes, 5 words each"],"wordCount":number,"characterCount":number}`;

    return this.executeAndParseJson<{
      refinedText: string;
      corrections: string[];
      wordCount: number;
      characterCount: number;
    }>(dto.text, systemPrompt);
  }

  // ---------------------------------------------------------------------
  // Tool #11: Cover Letter Generation
  // ---------------------------------------------------------------------
  async generateCoverLetter(dto: CoverLetterDto) {
    const systemPrompt = `Write a tailored cover letter matching the resume to the job description.
Output ONLY raw JSON. No markdown, no preamble.
Schema:
{"subject":"string","coverLetter":"3-4 short paragraphs, plain text","keyMatchHighlights":["exactly 3 bullets, each tying a resume skill to a job requirement"]}`;

    const prompt = `JOB DESCRIPTION:\n${dto.jobDescription}\n\nRESUME DETAILS:\n${dto.resumeDetails}`;

    return this.executeAndParseJson<{
      subject: string;
      coverLetter: string;
      keyMatchHighlights: string[];
    }>(prompt, systemPrompt);
  }
}