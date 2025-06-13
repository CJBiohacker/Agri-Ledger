import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PlantioService } from '../services/plantio.service';
import { CreatePlantioDto } from '../dtos/create-plantio.dto';
import { UpdatePlantioDto } from '../dtos/update-plantio.dto';

@Controller('plantios')
export class PlantioController {
  constructor(private readonly plantioService: PlantioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPlantioDto: CreatePlantioDto) {
    return this.plantioService.create(createPlantioDto);
  }

  @Get()
  findAll() {
    return this.plantioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.plantioService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePlantioDto: UpdatePlantioDto,
  ) {
    return this.plantioService.update(id, updatePlantioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.plantioService.remove(id);
  }
}
