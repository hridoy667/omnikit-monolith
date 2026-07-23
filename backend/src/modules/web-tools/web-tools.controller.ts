import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebToolsService } from './web-tools.service';
import { CreateWebToolDto } from './dto/create-web-tool.dto';
import { UpdateWebToolDto } from './dto/update-web-tool.dto';

@Controller('web-tools')
export class WebToolsController {
  constructor(private readonly webToolsService: WebToolsService) {}

  @Post()
  create(@Body() createWebToolDto: CreateWebToolDto) {
    return this.webToolsService.create(createWebToolDto);
  }

  @Get()
  findAll() {
    return this.webToolsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webToolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebToolDto: UpdateWebToolDto) {
    return this.webToolsService.update(+id, updateWebToolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webToolsService.remove(+id);
  }
}
