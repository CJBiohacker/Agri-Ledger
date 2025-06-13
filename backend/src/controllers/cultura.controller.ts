import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CulturaService } from '../services/cultura.service';
import { CreateCulturaDto } from '../dtos/create-cultura.dto';
import { UpdateCulturaDto } from '../dtos/update-cultura.dto';
import { CulturaModel } from '../models/cultura.model';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Culturas')
@Controller('culturas')
export class CulturaController {
  constructor(private readonly culturaService: CulturaService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Cria uma nova cultura' })
  @ApiResponse({
    status: 201,
    description: 'Cultura criada com sucesso.',
    type: CulturaModel,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBearerAuth()
  create(@Body() dto: CreateCulturaDto) {
    return this.culturaService.create(dto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'generico')
  @ApiOperation({ summary: 'Lista todas as culturas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de culturas.',
    type: [CulturaModel],
  })
  @ApiBearerAuth()
  findAll() {
    return this.culturaService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'generico')
  @ApiOperation({ summary: 'Busca uma cultura pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes da cultura.',
    type: CulturaModel,
  })
  @ApiResponse({ status: 404, description: 'Cultura não encontrada.' })
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.culturaService.findOne(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Atualiza uma cultura existente' })
  @ApiResponse({
    status: 200,
    description: 'Cultura atualizada com sucesso.',
    type: CulturaModel,
  })
  @ApiResponse({ status: 404, description: 'Cultura não encontrada.' })
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateCulturaDto) {
    return this.culturaService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Remove uma cultura' })
  @ApiResponse({
    status: 204,
    description: 'Cultura removida com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Cultura não encontrada.' })
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.culturaService.remove(id);
  }
}
