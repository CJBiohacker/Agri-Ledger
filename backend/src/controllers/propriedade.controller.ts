import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
  findAll(@Query('produtorId') produtorId?: string) {
    // Alterado de number para string
    return this.propriedadeService.findAll(produtorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Alterado de number para string
    return this.propriedadeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePropriedadeDto) {
    // Alterado de number para string
    return this.propriedadeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Alterado de number para string
    return this.propriedadeService.remove(id);
  }
}
