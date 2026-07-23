import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ContentRepurposeDto {
  @IsString()
  @IsNotEmpty()
  content!: string; // Draft notes or article text
}


export interface RelatedImage {
  url: string;
  altDescription: string;
  credit: { photographerName: string; photographerUrl: string; unsplashUrl: string };
}

export class TextRefineDto {
  @IsString()
  @IsNotEmpty()
  text!: string;

  @IsString()
  @IsOptional()
  tone?: string; // e.g., 'professional', 'casual', 'persuasive'
}

export class CoverLetterDto {
  @IsString()
  @IsNotEmpty()
  jobDescription!: string;

  @IsString()
  @IsNotEmpty()
  resumeDetails!: string;
}