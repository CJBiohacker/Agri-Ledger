import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutorService } from '../services/produtor.service';
import { CreateProdutorDto } from '../dtos/create-produtor.dto';
import { UpdateProdutorDto } from '../dtos/update-produtor.dto';

@Controller('produtores')
export class ProdutorController {
  constructor(private readonly produtorService: ProdutorService) {}

  @Post()
  create(@Body() dto: CreateProdutorDto) {
    return this.produtorService.create(dto);
  }

  @Get()
  findAll() {
    return this.produtorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.produtorService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProdutorDto) {
    return this.produtorService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtorService.remove(id);
  }
}
