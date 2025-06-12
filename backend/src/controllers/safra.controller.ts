import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SafraService } from '../services/safra.service';
import { CreateSafraDto } from '../dtos/create-safra.dto';
import { UpdateSafraDto } from '../dtos/update-safra.dto';

@Controller('safras')
export class SafraController {
  constructor(private readonly safraService: SafraService) {}

  @Post()
  create(@Body() dto: CreateSafraDto) {
    return this.safraService.create(dto);
  }

  @Get()
  findAll(@Query('propriedadeId') propriedadeId?: number) {
    return this.safraService.findAll(propriedadeId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.safraService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateSafraDto) {
    return this.safraService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.safraService.remove(id);
  }
}
