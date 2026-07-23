import { PartialType } from '@nestjs/swagger';
import { CreateWebToolDto } from './create-web-tool.dto';

export class UpdateWebToolDto extends PartialType(CreateWebToolDto) {}
