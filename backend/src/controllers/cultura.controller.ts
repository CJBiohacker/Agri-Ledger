import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CulturaService } from '../services/cultura.service';
import { CreateCulturaDto } from '../dtos/create-cultura.dto';
import { UpdateCulturaDto } from '../dtos/update-cultura.dto';

@Controller('culturas')
export class CulturaController {
  constructor(private readonly culturaService: CulturaService) {}

  @Post()
  create(@Body() dto: CreateCulturaDto) {
    return this.culturaService.create(dto);
  }

  @Get()
  findAll() {
    return this.culturaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.culturaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCulturaDto) {
    return this.culturaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.culturaService.remove(id);
  }
}
