import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PropriedadeService } from '../services/propriedade.service';
import { CreatePropriedadeDto } from '../dtos/create-propriedade.dto';
import { UpdatePropriedadeDto } from '../dtos/update-propriedade.dto';

@Controller('propriedades')
export class PropriedadeController {
  constructor(private readonly propriedadeService: PropriedadeService) {}

  @Post()
  create(@Body() dto: CreatePropriedadeDto) {
    return this.propriedadeService.create(dto);
  }

  @Get()
  findAll(@Query('produtorId') produtorId?: number) {
    return this.propriedadeService.findAll(produtorId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.propriedadeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdatePropriedadeDto) {
    return this.propriedadeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.propriedadeService.remove(id);
  }
}
