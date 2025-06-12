import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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
  findAll(@Query('safraId') safraId?: number) {
    return this.culturaService.findAll(safraId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.culturaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateCulturaDto) {
    return this.culturaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.culturaService.remove(id);
  }
}
