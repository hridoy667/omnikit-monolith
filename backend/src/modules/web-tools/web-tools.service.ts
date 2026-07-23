import { Injectable } from '@nestjs/common';
import { CreateWebToolDto } from './dto/create-web-tool.dto';
import { UpdateWebToolDto } from './dto/update-web-tool.dto';

@Injectable()
export class WebToolsService {
  create(createWebToolDto: CreateWebToolDto) {
    return 'This action adds a new webTool';
  }

  findAll() {
    return `This action returns all webTools`;
  }

  findOne(id: number) {
    return `This action returns a #${id} webTool`;
  }

  update(id: number, updateWebToolDto: UpdateWebToolDto) {
    return `This action updates a #${id} webTool`;
  }

  remove(id: number) {
    return `This action removes a #${id} webTool`;
  }
}
