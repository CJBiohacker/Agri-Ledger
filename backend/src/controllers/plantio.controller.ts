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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PlantioService } from '../services/plantio.service';
import { CreatePlantioDto } from '../dtos/create-plantio.dto';
import { UpdatePlantioDto } from '../dtos/update-plantio.dto';
import { PlantioModel } from '../models/plantio.model';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Plantios')
@Controller('plantios')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class PlantioController {
  constructor(private readonly plantioService: PlantioService) {}

  @Post()
  @Roles('admin', 'generico') // Permitir que usuários genéricos criem plantios
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo plantio' })
  @ApiResponse({
    status: 201,
    description: 'Plantio criado com sucesso.',
    type: PlantioModel,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createPlantioDto: CreatePlantioDto) {
    return this.plantioService.create(createPlantioDto);
  }

  @Get()
  @Roles('admin', 'generico')
  @ApiOperation({ summary: 'Lista todos os plantios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de plantios.',
    type: [PlantioModel],
  })
  findAll() {
    return this.plantioService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'generico')
  @ApiOperation({ summary: 'Busca um plantio pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do plantio.',
    type: PlantioModel,
  })
  @ApiResponse({ status: 404, description: 'Plantio não encontrado.' })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.plantioService.findOne(id);
  }

  @Put(':id')
  @Roles('admin', 'generico') // Permitir que usuários genéricos atualizem seus plantios (lógica de propriedade a ser implementada no serviço)
  @ApiOperation({ summary: 'Atualiza um plantio existente' })
  @ApiResponse({
    status: 200,
    description: 'Plantio atualizado com sucesso.',
    type: PlantioModel,
  })
  @ApiResponse({ status: 404, description: 'Plantio não encontrado.' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updatePlantioDto: UpdatePlantioDto,
  ) {
    return this.plantioService.update(id, updatePlantioDto);
  }

  @Delete(':id')
  @Roles('admin') // Apenas admin pode remover plantios diretamente
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove um plantio' })
  @ApiResponse({
    status: 204,
    description: 'Plantio removido com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Plantio não encontrado.' })
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.plantioService.remove(id);
  }
}
